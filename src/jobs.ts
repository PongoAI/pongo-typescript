import axios, { AxiosResponse } from 'axios';

import { BASE_URL } from './utils';

export async function getJobs({
  secretKey,
  subOrgId,
  jobStatus = '*',
  page = 0,
  version = "v1"
}: {
  secretKey: string,
  jobStatus: string
  page?: number
  subOrgId: string,
  version?: string
}): Promise<AxiosResponse> {
  const headers = {
    secret: secretKey,
  };
  const url = `${BASE_URL}/api/${version}/jobs`;

  const params = {
    sub_org_id: subOrgId,
    job_status: jobStatus,
    page: page

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

export async function getJob({
    secretKey,
    subOrgId,
    jobId,
    version = "v1"
  }: {
    secretKey: string,
    jobId: string
    subOrgId: string,
    version?: string
  }): Promise<AxiosResponse> {
    const headers = {
      secret: secretKey,
    };
    const url = `${BASE_URL}/api/${version}/job`;
  
    const params = {
      sub_org_id: subOrgId,
      job_id: jobId,
  
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
  