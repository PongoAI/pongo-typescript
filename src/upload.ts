import axios, { AxiosResponse } from 'axios';

import { UploadMetadata } from './interfaces';
import { BASE_URL } from './utils';





export async function upload(args: {
  secretKey: string,
  subOrgId: string,
  data: string | string[],
  metadata: UploadMetadata | UploadMetadata[],
  timestamp: number,
  version?: string,
}): Promise<AxiosResponse> {
  const headers = {
    secret: args.secretKey,
  };
  const { version = "v1" } = args; // version defaults to "v1" if not provided
  const payload = {
    sub_org_id: args.subOrgId,
    data: args.data,
    metadata: args.metadata,
    timestamp: args.timestamp || Math.floor(Date.now() / 1000),
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





