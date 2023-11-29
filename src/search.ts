import axios from 'axios';
import { BASE_URL } from './utils';

export async function search({
  publicKey,
  secretKey,
  subOrgId,
  query,
  numResults = 15,
  maxRerankerResults = 5,
  startTime,
  endTime,
  sources = [],
  version = "v1",
}): Promise<any> {
  const headers = {
    secret: secretKey,
    id: publicKey,
  };
  const url = `${BASE_URL}/api/${version}/search`;

  const payload = {
    sub_org_id: subOrgId,
    query: query,
    sources: sources.join(','),
    start_time: startTime,
    end_time: endTime,
    num_results: numResults,
    max_reranker_results: maxRerankerResults,
  };

  const params = Object.fromEntries(Object.entries(payload).filter(([_, value]) => value != null));

  try {
    const response = await axios.get(url, { headers, params });
    return response.data;
  } catch (error) {
    throw error;
  }
}
