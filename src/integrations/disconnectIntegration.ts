import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../utils';

export async function disconnectIntegration(args: {
  secretKey: string,
  integrationId: string,
  integrationName: string,
  version?: string
}): Promise<AxiosResponse> {
  const { secretKey, version = "v1", integrationId, integrationName } = args;

  const headers = {
    secret: secretKey
  };

  const url = `${BASE_URL}/api/${version}/org/disconnect-integration`;

  try {
    const response = await axios.post(url, { headers, data: { integration_id: integrationId, integration_name: integrationName } });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
}
