import axios, { AxiosResponse } from 'axios';

import { BASE_URL } from './utils';

export async function get({
  secretKey,
  subOrgId,
  docId,
  parentId,
  version = "v1"
}: {
  secretKey: string,
  subOrgId: string,
  docId?: string,
  parentId?: string,
  version?: string
}): Promise<AxiosResponse> {
  const headers = {
    secret: secretKey,
  };
  const url = `${BASE_URL}/api/${version}/data`;

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
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
}
