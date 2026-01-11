import apiClient from '../../api/apiClient';
import type { AddAircraftDetailRequest } from '@ct/core/api/AddAircraftDetailRequest';
import type { AddAircraftDetailResponse } from '@ct/core/api/AddAircraftDetailResponse';
import type { AxiosResponse } from 'axios';

export async function createAircraftQuery(aircraftDetail: AddAircraftDetailRequest):
  Promise<AxiosResponse<AddAircraftDetailResponse> | null> {
  if (!aircraftDetail) return null;

  return await apiClient.post<AddAircraftDetailResponse>(`${import.meta.env.VITE_API_URL}/aircraft`, aircraftDetail);
};
