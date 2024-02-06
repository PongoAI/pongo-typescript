import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../utils';

export async function updateDriveDirectories(args: {
  secretKey: string,
  newDirs: any[],
  integrationId: string,
  version?: string
}): Promise<AxiosResponse> {
  const {
    secretKey,
    newDirs,
    integrationId,
    version = "v1"
  } = args;

  const headers = {
    secret: secretKey,
  };
  const url = `${BASE_URL}/api/${version}/google-drive/update-dirs`;

  try {
    const response = await axios.post(url, { new_dirs: newDirs, integration_id: integrationId }, { headers });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
}
