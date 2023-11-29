import axios from 'axios';
import { BASE_URL } from '../utils';

export async function disconnectIntegration(args: {
  publicKey: string,
  secretKey: string,
  integrationId: string,
  integrationName: string,
  version?: string
}): Promise<any> {
  const { publicKey, secretKey, version = "v1", integrationId, integrationName } = args;

  const headers = {
    secret: secretKey,
    id: publicKey,
  };

  const url = `${BASE_URL}/api/${version}/org/disconnect-integration`;

  try {
    const response = await axios.post(url, { headers, data: { integration_id: integrationId, integration_name: integrationName } });
    return response.data;
  } catch (error) {
    throw error;
  }
}
