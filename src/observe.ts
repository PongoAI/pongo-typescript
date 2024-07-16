import axios, { AxiosResponse } from 'axios';

import { BASE_URL, REGION_MAP } from './utils';

export async function observe({
  secretKey,
  query,
  docs,
  logMetadata = null,
  version = "v1",
  region = "us-west-2",
}: {
  secretKey: string,
  query: string,
  docs: any[],
  logMetadata?: Record<string, any> | null,
  version?: string,
  region?: string
}): Promise<AxiosResponse> {
  const headers = {
    secret: secretKey,
    'Content-Type': 'application/json',
  };
  const baseUrl = REGION_MAP[region] || BASE_URL;
  const url = `${baseUrl}/api/${version}/observe`;

  const payload = {
    query: query,
    docs: docs,
    log_metadata: logMetadata,
  };

  const body = Object.fromEntries(Object.entries(payload).filter(([, value]) => value != null));

  // Serialize the data to JSON format
  const jsonData = JSON.stringify(body);

  try {
    const response = await axios.post(url, jsonData, { headers });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
}
