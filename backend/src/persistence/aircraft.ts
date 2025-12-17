import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { Resource } from 'sst';

import { ddb, KEY_DELIM } from './ddbClient.js';
import { getUserKey } from './utils.js';
import type { AircraftSummary } from '@ct/core/models/AircraftSummary.js';
import type { DBAircraft } from './types/dbAircraft.js';

export async function getAircraftForUser(auth0Id: string): Promise<AircraftSummary[]> {
  const cmd = new QueryCommand({
    TableName: Resource.aircraft.name,
    ExpressionAttributeValues: {
      ':userId': getUserKey(auth0Id)
    },
    KeyConditionExpression: 'PK = :userId'
  });

  const response = await ddb.send(cmd);

  if (!response.Count) return [];

  return response.Items?.reduce<AircraftSummary[]>((acc, row) => {
    const aircraft: AircraftSummary | null = parseAircraft(row as DBAircraft);
    if (aircraft) acc.push(aircraft);
    return acc;
  }, []) ?? [];
}

// MARK: Helpers
function parseAircraft(row: DBAircraft): AircraftSummary | null {
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
