import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './utils';

export async function createSubOrg({
  secretKey,
  subOrgName,
  version = "v1",
}: {
  secretKey: string,
  subOrgName: string,
  version?: string
}): Promise<AxiosResponse> {
  const headers = {
    secret: secretKey,
  };
  const url = `${BASE_URL}/api/${version}/sub-org`;
  const payload = {
    sub_org_name: subOrgName,
  };

  try {
    const response = await axios.post(url, payload, { headers});
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
}

export async function getSubOrgs({
  secretKey,
  version = "v1",
}: {
  secretKey: string,
  version?: string
}): Promise<AxiosResponse> {
  const headers = {
    secret: secretKey,
  };
  const url = `${BASE_URL}/api/${version}/sub-orgs`;

  try {
    const response = await axios.get(url, { headers });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
}

export async function getSubOrg({
  secretKey,
  subOrgId,
  version = "v1",
}: {
  secretKey: string,
  subOrgId: string,
  version?: string
}): Promise<AxiosResponse> {
  const headers = {
    secret: secretKey,
  };
  const url = `${BASE_URL}/api/${version}/sub-org`;
  const params = {
    sub_org_id: subOrgId,
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

export async function deleteSubOrg({
  secretKey,
  subOrgId,
  version = "v1",
}: {
  secretKey: string,
  subOrgId: string,
  version?: string
}): Promise<AxiosResponse> {
  const headers = {
    secret: secretKey,
  };
  const url = `${BASE_URL}/api/${version}/sub-org`;
  const params = {
    sub_org_id: subOrgId,
  };

  try {
    const response = await axios.delete(url, { headers, params });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
}

export async function updateSubOrg({
  secretKey,
  subOrgId,
  subOrgName,
  version = "v1",
}: {
  secretKey: string,
  subOrgId: string,
  subOrgName: string,
  version?: string
}): Promise<AxiosResponse> {
  const headers = {
    secret: secretKey,
  };
  const url = `${BASE_URL}/api/${version}/sub-org`;
  const payload = {
    sub_org_id: subOrgId,
    sub_org_name: subOrgName,
  };

  try {
    const response = await axios.put(url, payload, { headers});
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
}
