import axios from 'axios';
import { BASE_URL } from '../utils';

export async function updateDriveDirectories(args: {
  publicKey: string,
  secretKey: string,
  newDirs: any[],
  integrationId: string,
  version?: string
}): Promise<any> {
  const {
    publicKey,
    secretKey,
    newDirs,
    integrationId,
    version = "v1"
  } = args;

  const headers = {
    secret: secretKey,
    id: publicKey,
  };
  const url = `${BASE_URL}/api/${version}/google-drive/update-dirs`;

  try {
    const response = await axios.post(url, { new_dirs: newDirs, integration_id: integrationId }, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}
