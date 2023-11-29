import axios from 'axios';
import { BASE_URL } from './utils';

export async function get(
  publicKey: string,
  secretKey: string,
  subOrgId: string,
  docId?: string,
  parentId?: string,
  version: string = "v1"
): Promise<any> {
  const headers = {
    secret: secretKey,
    id: publicKey,
  };
  const url = `${BASE_URL}/api/${version}/get_data`;

  if (!docId && !parentId) {
    throw new Error("Must provide either doc_id or parent_id");
  }

  if (docId && parentId) {
    throw new Error("Cannot provide both doc_id and parent_id");
  }

  const params = {
    sub_org_id: subOrgId,
    doc_id: docId,
    parent_id: parentId,
  };

  try {
    const response = await axios.get(url, { headers, params });
    return response.data;
  } catch (error) {
    throw error;
  }
}
