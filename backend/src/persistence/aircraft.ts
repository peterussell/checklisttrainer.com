import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { Resource } from 'sst';
import { v7 as uuidv7 } from 'uuid';

import { ddb, KEY_DELIM } from './ddbClient.js';
import { getAircraftKey, getUserKey, stripAircraftKey, stripChecklistKey } from './utils.js';
import type { AircraftSummary } from '@ct/core/models/AircraftSummary.js';
import type { DBAircraftChecklist, DBAircraftMetadata, DBAircraftView } from './types/dbAircraft.js';
import type { Aircraft, AircraftView } from '@ct/core/models/Aircraft.js';
import type { Checklist } from '@ct/core/models/Checklist.js';
import { getAircraftImgSignedUrl } from '../storage/utils.js';
import type { AddAircraftDetailRequest } from '@ct/core/api/AddAircraftDetailRequest.js';
import { AIRCRAFT_KEY, CHECKLIST_KEY, METADATA_KEY, VIEW_KEY } from './constants.js';

export async function getAllAircraftForUser(auth0Id: string): Promise<AircraftSummary[]> {
  const userKey = getUserKey(auth0Id);
  const cmd = new QueryCommand({
    TableName: Resource.aircraft.name,
    ExpressionAttributeValues: {
      ':userId': userKey,
    },
    KeyConditionExpression: 'PK = :userId'
  });

  const response = await ddb.send(cmd);

  const parsedAircraft = [];
  for (const row of response.Items ?? []) {
    const aircraft = await parseAircraftSummary(row as DBAircraftMetadata, userKey);
    if (aircraft) parsedAircraft.push(aircraft);
  }

  return parsedAircraft;
}

export async function getAircraftById(aircraftId: string, ownerId: string): Promise<Aircraft | null> {
  if (!aircraftId) return null;

  const cmd = new QueryCommand({
    TableName: Resource.aircraft.name,
    ExpressionAttributeValues: {
      ':aircraftId': getAircraftKey(aircraftId)
    },
    KeyConditionExpression: 'PK = :aircraftId'
  });

  const response = await ddb.send(cmd);
  if (!response.Items?.length) return null;
  const rows = response.Items as (DBAircraftMetadata | DBAircraftView)[];
  return parseAircraftDetail(rows, getUserKey(ownerId));
}

export async function createAircraft(aircraftDetail: AddAircraftDetailRequest) {
  if (!aircraftDetail) return null;

  const {registration, description} = aircraftDetail;
  const id = uuidv7();
  const key = getAircraftKey(id);
  const cmd = new PutCommand({
    TableName: Resource.aircraft.name,
    Item: {
      PK: key,
      SK: METADATA_KEY,
      registration,
      description,
      createdAt: new Date().toISOString()
    }
  });

  await ddb.send(cmd);
  return id;
}

// MARK: Helpers
async function parseAircraftSummary(row: DBAircraftMetadata, ownerKey: string): Promise<AircraftSummary | null> {
  if (!row?.SK) return null;
    const parts = row.SK.split(KEY_DELIM);
    if (parts.length !== 2 || parts[0].toUpperCase() !== AIRCRAFT_KEY) return null;

    return {
      id: stripAircraftKey(row.SK),
      description: row.description,
      registration: row.registration,
      img: await getAircraftImgSignedUrl(ownerKey, row.image_path)
    };
}

type DBAircraftRow = DBAircraftMetadata | DBAircraftView | DBAircraftChecklist;

/**
 * Parses and combines all aircraft rows, eg. metadata, views, checklists,
 * and returns the hydrated Aircraft domain object.
 * @param rows all rows for a single aircraft (ie. with matching aircraft ID)
 * @returns Aircraft domain object if one could be constructed, otherwise null.
 */
async function parseAircraftDetail(rows: DBAircraftRow[] | undefined, ownerKey: string): Promise<Aircraft | null> {
  if (!rows?.length) return null;

  // Ensure we have metadata
  const m = rows.find((row: DBAircraftRow) => row.SK && row.SK.startsWith(METADATA_KEY));
  if (!m) {
    console.error(`No metadata found for aircraft ID ${rows[0].PK ?? '(unknown)'}`); // TODO: logger
    return null;
  }

  const { PK, registration, description } = m as DBAircraftMetadata;

  const aircraft: Aircraft = {
    id: stripAircraftKey(PK), // Fail loudly if we don't have a PK for some reason
    registration: registration,
    description: description,
    views: [],
    checklists: []
  }
  
  // Parse remaining rows (views, checklists, etc.)
  for (const row of rows) {
    if (!row.SK) continue;

    if (row.SK.startsWith(VIEW_KEY)) {
      const view = await AircraftView_to_Domain(row as DBAircraftView, ownerKey);
      if (view) aircraft.views.push(view);

    } else if (row.SK.startsWith(CHECKLIST_KEY)) {
      const checklist = Checklist_to_Domain(row as DBAircraftChecklist);
      if (checklist) aircraft.checklists.push(checklist);
    }
  }

  return aircraft;
}

const AircraftView_to_Domain = async (row: DBAircraftView, ownerKey: string): Promise<AircraftView> => ({
  imgSrc: await getAircraftImgSignedUrl(ownerKey, row.image_path),
  isDefault: row.is_default ?? false,
  description: row.description,
  controls: row.controls
});

const Checklist_to_Domain = (row: DBAircraftChecklist): Checklist => ({
  id: stripChecklistKey(row.SK),
  name: row.name,
  slug: row.slug,
  type: row.type,
  steps: row.steps
});
