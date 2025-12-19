import { Resource } from 'sst';
import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

import { ddb, KEY_DELIM } from './ddbClient.js';
import type { User } from '@ct/core/models/accounts/user.js';
import type { DBAccount } from './types/dbAccount.js';
import { getOrgKey, getUserKey } from './utils.js';

export async function getUser(auth0Id: string): Promise<User | null> {
  const cmd = new QueryCommand({
    TableName: Resource.accounts.name,
    ExpressionAttributeValues: {
      ':userId': getUserKey(auth0Id)
    },
    KeyConditionExpression: 'PK = :userId'
  });

  const response = await ddb.send(cmd);

  if (!response.Count) return null;

  // One row per user org. Reduce to a list of org IDs.
  const orgIds = response.Items?.reduce<string[]>((acc, row) => {
    const org = parseOrg(row as DBAccount);
    if (org) acc.push(org);
    return acc;
  }, []);

  return { auth0Id, orgIds: orgIds ?? [] };
}

export async function addUser(auth0Id: string,  orgId?: string) {
  const cmd = new PutCommand({
    TableName: Resource.accounts.name,
    Item: {
      PK: getUserKey(auth0Id),
      SK: getOrgKey(orgId ?? null),
    },
  });

  await ddb.send(cmd); // TODO: error handling & logging
}

// MARK: Helpers
function parseOrg(row: DBAccount): string | null {
  if (!row?.SK) return null;
  const parts = row.SK.split(KEY_DELIM);
  if (parts.length !== 2 || parts[0].toUpperCase() !== 'ORG') return null;
  return parts[1];
}