import axios, { AxiosResponse } from 'axios';

import { BASE_URL, REGION_MAP } from './utils';


export async function semFilter({
  secretKey,
  query,
  docs,
  numResults = 10,
  vecSampleSize = 25,
  publicMetadataField = 'metadata',
  keyField = 'id',
  plaintextSampleSize = 5,
  textField = 'text',
  version = "v1",
  observe = false,
  logMetadata = {},
  region = "us-west-2"
}): Promise<AxiosResponse> {
  const headers = {
    secret: secretKey,
    'Content-Type': 'application/json'
  };
  const baseUrl = REGION_MAP[region] || BASE_URL;
  const url = `${baseUrl}/api/${version}/filter`;

  const payload = {
    query: query,
    text_field: textField,
    public_metadata_field: publicMetadataField,
    plaintext_sample_size: plaintextSampleSize,
    num_results: numResults,
    vec_sample_size: vecSampleSize,
    key_field: keyField,
    docs: docs,
    observe: observe,
    log_metadata: logMetadata
  };

  const body = Object.fromEntries(Object.entries(payload).filter(([, value]) => value != null));
  try {
    const response = await axios.post(url, body, { headers });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
}
