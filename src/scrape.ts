import axios from 'axios';
import { BASE_URL } from './utils';

export async function scrapeWebsite({
  publicKey,
  secretKey,
  subOrgId,
  siteName,
  siteUrl,
  version = "v1",
}): Promise<any> {
  const headers = {
    secret: secretKey,
    id: publicKey,
  };
  const url = `${BASE_URL}/api/${version}/scrape-website`;

  const payload = {
    sub_org_id: subOrgId,
    url: siteUrl,
    source: siteName,
  };

  try {
    const response = await axios.post(url, payload, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}
