import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './utils';
import { randomUUID } from 'crypto';


const MAX_FILE_SIZE = 20 * 1024 * 1024;

export async function upload({
  publicKey,
  secretKey,
  subOrgId,
  sourceName,
  data,
  metadata = {},
  parentId,
  timestamp,
  version = "v1",
}): Promise<AxiosResponse> {
  const headers = {
    secret: secretKey,
    id: publicKey,
  };
  let payload: any = {
    sub_org_id: subOrgId,
    source: sourceName,
    data: data,
    metadata: metadata,
    timestamp: timestamp || Math.floor(Date.now() / 1000),
    parent_id: parentId || randomUUID(),
  };

  const url = `${BASE_URL}/api/${version}/upload-data`;

  try {
    const response = await axios.post(url, payload, { headers: headers });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
}



export async function uploadPdf({
  publicKey,
  secretKey,
  subOrgId,
  sourceName,
  filePath,
  metadata = {},
  parentId,
  timestamp,
  version = "v1",
}): Promise<AxiosResponse> {
  const headers = {
    'secret': secretKey,
    'id': publicKey,
  };
  const url = `${BASE_URL}/api/${version}/upload-pdf`;

  let payload: any = {
    sub_org_id: subOrgId,
    source: sourceName,
    metadata: metadata,
    timestamp: timestamp || Math.floor(Date.now() / 1000),
    parent_id: parentId || randomUUID(),
  };

  if (filePath.endsWith(".pdf")) {
    const fs = require('fs');
    const fsPromises = fs.promises;
    const path = require('path');
    const axios = require('axios').default;
    const FormData = require('form-data');

    try {
      const fileStats = await fsPromises.stat(filePath);
      const file_size = fileStats.size;
      if (file_size > MAX_FILE_SIZE) {
        throw new Error("The file is too large. Please provide a file that is less than 20MB.");
      }

      const formData = new FormData();
      const fileBuffer = await fsPromises.readFile(filePath);
      formData.append('file', fileBuffer, path.basename(filePath));
      if(subOrgId) {formData.append('sub_org_id', subOrgId);}
      formData.append('source', sourceName);
      formData.append('metadata', JSON.stringify(metadata));
      formData.append('timestamp', payload.timestamp.toString());
      formData.append('parent_id', payload.parent_id);

      const response = await axios.post(url, formData, { headers: headers });
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  } else {
    throw new Error("Provided file is not a PDF.");
  }
}


