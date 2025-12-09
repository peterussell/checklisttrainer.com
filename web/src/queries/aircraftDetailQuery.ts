import type { Aircraft } from '@ct/core/models/Aircraft';
import apiClient from '../../api/apiClient';

export async function aircraftDetailQuery(
  aircraftId: string,
): Promise<Aircraft | null> {
  if (!aircraftId) return null;

  const response = await apiClient.get(`${import.meta.env.VITE_API_URL}/aircraft/${aircraftId}`);
  return response.data;
};
