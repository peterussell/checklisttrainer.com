import apiClient from '../../api/apiClient';
import type { AddAircraftDetailRequest } from '@ct/core/api/AddAircraftDetailRequest';

export async function createAircraftQuery(aircraftDetail: AddAircraftDetailRequest) { // TODO: return type
  if (!aircraftDetail) return null;

  const response = await apiClient.post(`${import.meta.env.VITE_API_URL}/aircraft`, aircraftDetail);
  return response.data;
};
