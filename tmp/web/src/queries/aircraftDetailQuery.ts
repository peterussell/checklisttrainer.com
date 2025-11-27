import type { Aircraft } from "../../../core/models/Aircraft";

export async function aircraftDetailQuery(aircraftId: string): Promise<Aircraft | null> {
  if (!aircraftId) return null;
  const response = await fetch(`http://localhost:3000/aircraft/${aircraftId}`);
  return response.json();
};
