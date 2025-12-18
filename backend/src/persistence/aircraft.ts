import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { Resource } from 'sst';

import { ddb, KEY_DELIM } from './ddbClient.js';
import { getAircraftKey, getUserKey } from './utils.js';
import type { AircraftSummary } from '@ct/core/models/AircraftSummary.js';
import type { DBAircraftChecklist, DBAircraftMetadata, DBAircraftView } from './types/dbAircraft.js';
import type { Aircraft, AircraftView } from '@ct/core/models/Aircraft.js';
import { GetCommand } from '@aws-sdk/client-dynamodb';
import type { Checklist } from '@ct/core/models/Checklist.js';

export async function getAllAircraftForUser(auth0Id: string): Promise<AircraftSummary[]> {
  const cmd = new QueryCommand({
    TableName: Resource.aircraft.name,
    ExpressionAttributeValues: {
      ':userId': getUserKey(auth0Id)
    },
    KeyConditionExpression: 'PK = :userId'
  });

  const response = await ddb.send(cmd);

  return response.Items?.reduce<AircraftSummary[]>((acc, row) => {
    const aircraft: AircraftSummary | null = parseAircraftSummary(row as DBAircraftMetadata);
    if (aircraft) acc.push(aircraft);
    return acc;
  }, []) ?? [];
}

export async function getAircraft(aircraftId: string): Promise<Aircraft | null> {
  if (!aircraftId) return null;

  const cmd = new QueryCommand({
    TableName: Resource.aircraft.name,
    ExpressionAttributeValues: {
      ':aircraftId': getAircraftKey(aircraftId)
    },
    KeyConditionExpression: 'PK = :aircraftId'
  });

  const response = await ddb.send(cmd);
  return parseAircraftDetail(response.Items as (DBAircraftMetadata | DBAircraftView)[] | undefined);
}

// MARK: Helpers
function parseAircraftSummary(row: DBAircraftMetadata): AircraftSummary | null {
  if (!row?.SK) return null;
    const parts = row.SK.split(KEY_DELIM);
    if (parts.length !== 2 || parts[0].toUpperCase() !== 'AIRCRAFT') return null;

    return {
      id: parts[1],
      description: row.description,
      registration: row.registration,
      img: row.image_path
    };
}

type DBAircraftRow = DBAircraftMetadata | DBAircraftView | DBAircraftChecklist;

/**
 * Parses and combines all aircraft rows, eg. metadata, views, checklists,
 * and returns the hydrated Aircraft domain object.
 * @param rows all rows for a single aircraft (ie. with matching aircraft ID)
 * @returns Aircraft domain object if one could be constructed, otherwise null.
 */
function parseAircraftDetail(rows: DBAircraftRow[] | undefined): Aircraft | null {
  if (!rows?.length) return null;

  // Ensure we have metadata
  const m = rows.find((row: DBAircraftRow) => row.SK && row.SK.startsWith('METADATA'));
  if (!m) {
    console.error(`No metadata found for aircraft ID ${rows[0].PK ?? '(unknown)'}`); // TODO: logger
    return null;
  }

  const { PK, registration, description } = m as DBAircraftMetadata;

  const aircraft: Aircraft = {
    id: PK, // Fail loudly if we don't have a PK for some reason
    registration: registration,
    description: description,
    views: [],
    checklists: []
  }

  // Parse remaining rows (views, checklists, etc.)
  rows.forEach((row: DBAircraftRow) => {
    if (!row.SK) return;

    if (row.SK.startsWith('VIEW')) {
      const view = AircraftView_to_Domain(row as DBAircraftView);
      if (view) aircraft.views.push(view);
    } else if (row.SK.startsWith('CHECKLIST')) {
      const checklist = Checklist_to_Domain(row as DBAircraftChecklist);
      if (checklist) aircraft.checklists.push(checklist);
    }
  });

  return aircraft;
}

const AircraftView_to_Domain = (row: DBAircraftView): AircraftView => ({
  imgSrc: row.image_path,
  isDefault: row.is_default ?? false,
  description: row.description,
  controls: row.controls
});

const Checklist_to_Domain = (row: DBAircraftChecklist): Checklist => ({
  id: row.SK,
  name: row.name,
  slug: row.slug,
  type: row.type,
  steps: row.steps
});
