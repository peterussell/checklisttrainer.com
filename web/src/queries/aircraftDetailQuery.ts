import type { Aircraft } from "@ct/core/models/Aircraft";

export async function aircraftDetailQuery(aircraftId: string): Promise<Aircraft | null> {
  if (!aircraftId) return null;
  const response = await fetch(`${import.meta.env.VITE_API_URL}/aircraft/${aircraftId}`);
  return response.json();
};
