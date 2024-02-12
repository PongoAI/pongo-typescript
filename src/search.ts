import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './utils';

export async function search({
  secretKey,
  subOrgId,
  query,
  numResults = 15,
  sampelSize = 10,
  reduceTokens = false,
  startTime,
  endTime,
  sources = [],
  version = "v1",
}): Promise<AxiosResponse> {
  const headers = {
    secret: secretKey,
  };
  const url = `${BASE_URL}/api/${version}/search`;

  const payload = {
    sub_org_id: subOrgId,
    query: query,
    sources: sources.join(','),
    start_time: startTime,
    reduce_tokens: reduceTokens,
    end_time: endTime,
    num_results: numResults,
    sample_size: sampelSize,
  };

  const params = Object.fromEntries(Object.entries(payload).filter(([_, value]) => value != null));

  try {
    const response = await axios.get(url, { headers, params });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
}
