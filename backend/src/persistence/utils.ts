import { KEY_DELIM } from "./ddbClient.js";

export const getUserKey = (auth0Id: string) => `USER${KEY_DELIM}${auth0Id}`;
export const getOrgKey = (orgId: string | null) => `ORG${KEY_DELIM}${orgId ?? 'NONE'}`;
export const getAircraftKey = (aircraftId: string) => `AIRCRAFT${KEY_DELIM}${aircraftId}`;
