import axios from 'axios';
import { BASE_URL } from '../utils';

export async function getAuthLink(
  publicKey: string,
  secretKey: string,
  subOrgId: string,
  integrationName: string,
  redirectUri: string,
  version: string = "v1"
): Promise<any> {
  const headers = {
    secret: secretKey,
    id: publicKey,
  };
  const url = `${BASE_URL}/api/${version}/sub-org/auth-link?sub_org_id=${subOrgId}&integration_name=${integrationName}&redirect_uri=${encodeURIComponent(redirectUri)}`;

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}
