import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const ddbClient = new DynamoDBClient({});
export const ddb = DynamoDBDocumentClient.from(ddbClient);

export const KEY_DELIM = '#';
