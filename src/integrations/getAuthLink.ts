import axios, { AxiosResponse } from 'axios';

import { BASE_URL } from '../utils';

export async function getAuthLink(args: {
  secretKey: string,
  subOrgId: string,
  integrationName: string,
  redirectUri: string,
  version?: string
}): Promise<AxiosResponse> {
  const {
    secretKey,
    subOrgId,
    integrationName,
    redirectUri,
    version = "v1"
  } = args;

  const headers = {
    secret: secretKey,
  };
  const url = `${BASE_URL}/api/${version}/sub-org/auth-link?sub_org_id=${subOrgId}&integration_name=${integrationName}&redirect_uri=${encodeURIComponent(redirectUri)}`;

  try {
    const response = await axios.get(url, { headers });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
}
