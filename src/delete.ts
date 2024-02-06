import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './utils'

export async function deleteDocument(args: {
  publicKey: string,
  secretKey: string,
  subOrgId?: string,
  docId?: string,
  parentId?: string,
  websiteUrl?: string,
  version?: string
}): Promise<AxiosResponse> {
  var {
    publicKey,
    secretKey,
    subOrgId,
    docId,
    parentId,
    websiteUrl,
    version = "v1"
  } = args;

  const headers = {
    secret: secretKey,
    id: publicKey,
  };
  const url = `${BASE_URL}/api/${version}/data`;

  if (!docId && !parentId && !websiteUrl) {
    throw new Error("Must provide either doc_id or parent_id");
  }

  if (docId && parentId && websiteUrl) {
    throw new Error("Cannot provide both doc_id and parent_id");
  }

  let payloadParentId = parentId;
  if (websiteUrl) {
    payloadParentId = websiteUrl;
    docId = undefined;
  }

  const payload = {
    sub_org_id: subOrgId,
    doc_id: docId,
    parent_id: payloadParentId,
  };

  const params = Object.fromEntries(
    Object.entries(payload)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, Array.isArray(value) ? value.join(',') : value])
  );

  try {
    const response = await axios.delete(url, { headers, params, timeout: 120000 });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
}
