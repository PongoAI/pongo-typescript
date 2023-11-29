import axios from 'axios';
import { BASE_URL } from './utils';

export async function createSubOrg({
  publicKey,
  secretKey,
  subOrgName,
  version = "v1",
}: {
  publicKey: string,
  secretKey: string,
  subOrgName: string,
  version?: string
}): Promise<any> {
  const headers = {
    secret: secretKey,
    id: publicKey,
  };
  const url = `${BASE_URL}/api/${version}/sub-org`;
  const payload = {
    sub_org_name: subOrgName,
  };

  try {
    const response = await axios.post(url, payload, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getSubOrgs({
  publicKey,
  secretKey,
  version = "v1",
}: {
  publicKey: string,
  secretKey: string,
  version?: string
}): Promise<any> {
  const headers = {
    secret: secretKey,
    id: publicKey,
  };
  const url = `${BASE_URL}/api/${version}/sub-orgs`;

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getSubOrg({
  publicKey,
  secretKey,
  subOrgId,
  version = "v1",
}: {
  publicKey: string,
  secretKey: string,
  subOrgId: string,
  version?: string
}): Promise<any> {
  const headers = {
    secret: secretKey,
    id: publicKey,
  };
  const url = `${BASE_URL}/api/${version}/sub-org`;
  const params = {
    sub_org_id: subOrgId,
  };

  try {
    const response = await axios.get(url, { headers, params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteSubOrg({
  publicKey,
  secretKey,
  subOrgId,
  version = "v1",
}: {
  publicKey: string,
  secretKey: string,
  subOrgId: string,
  version?: string
}): Promise<any> {
  const headers = {
    secret: secretKey,
    id: publicKey,
  };
  const url = `${BASE_URL}/api/${version}/sub-org`;
  const params = {
    sub_org_id: subOrgId,
  };

  try {
    const response = await axios.delete(url, { headers, params, timeout: 120 });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateSubOrg({
  publicKey,
  secretKey,
  subOrgId,
  subOrgName,
  version = "v1",
}: {
  publicKey: string,
  secretKey: string,
  subOrgId: string,
  subOrgName: string,
  version?: string
}): Promise<any> {
  const headers = {
    secret: secretKey,
    id: publicKey,
  };
  const url = `${BASE_URL}/api/${version}/sub-org`;
  const payload = {
    sub_org_id: subOrgId,
    sub_org_name: subOrgName,
  };

  try {
    const response = await axios.put(url, payload, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}
