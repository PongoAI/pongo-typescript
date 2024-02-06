import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './utils';

export async function scrapeWebsite({
  secretKey,
  subOrgId,
  siteName,
  siteUrl,
  version = "v1",
}): Promise<AxiosResponse> {
  const headers = {
    secret: secretKey,
  };
  const url = `${BASE_URL}/api/${version}/scrape-website`;

  const payload = {
    sub_org_id: subOrgId,
    url: siteUrl,
    source: siteName,
  };

  try {
    const response = await axios.post(url, payload, { headers });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
}
