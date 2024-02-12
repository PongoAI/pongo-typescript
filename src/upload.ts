import axios, { AxiosResponse } from 'axios';

import { BASE_URL } from './utils';





export async function upload({
  secretKey,
  subOrgId,
  data,
  metadata,
  timestamp,
  version = "v1",
}): Promise<AxiosResponse> {
  const headers = {
    secret: secretKey,
  };
  const payload = {
    sub_org_id: subOrgId,
    data: data,
    metadata: metadata,
    timestamp: timestamp || Math.floor(Date.now() / 1000),
  };

  const url = `${BASE_URL}/api/${version}/upload-data`;

  try {
    const response = await axios.post(url, payload, { headers: headers });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
}





