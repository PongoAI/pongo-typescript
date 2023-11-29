import axios from 'axios';
import { BASE_URL } from './utils';
import { randomUUID } from 'crypto';


const MAX_FILE_SIZE = 20 * 1024 * 1024;

export async function upload(
  publicKey: string,
  secretKey: string,
  subOrgId: string,
  sourceName: string,
  data: string | string[],
  metadata: object = {},
  parentId?: string,
  timestamp?: number,
  version: string = "v1",
): Promise<any> {
  const headers = {
    secret: secretKey,
    id: publicKey,
  };
  let payload: any = {
    sub_org_id: subOrgId,
    source: sourceName,
    data: data,
    metadata: metadata,
    timestamp: timestamp,
    parent_id: parentId,
  };

  const url = `${BASE_URL}/api/${version}/upload-data`;

  if (!timestamp) {
    payload.timestamp = Math.floor(Date.now() / 1000);
  }

  if (!parentId) {
    payload.parent_id = randomUUID();
  }

  try {
    const response = await axios.post(url, payload, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function uploadPdf(
  publicKey: string,
  secretKey: string,
  subOrgId: string,
  sourceName: string,
  filePath: string,
  metadata: object = {},
  parentId?: string,
  timestamp?: number,
  version: string = "v1",
): Promise<any> {
  const headers = {
    secret: secretKey,
    id: publicKey,
  };
  const url = `${BASE_URL}/api/${version}/upload-pdf`;

  let payload: any = {
    sub_org_id: subOrgId,
    source: sourceName,
    metadata: metadata,
    timestamp: timestamp,
    parent_id: parentId,
  };

  if (!timestamp) {
    payload.timestamp = Math.floor(Date.now() / 1000);
  }

  if (!parentId) {
    payload.parent_id = randomUUID();
  }

  if (filePath.endsWith(".pdf")) {
    const fs = require('fs');
    const fsPromises = fs.promises;
    const path = require('path');
    const file_name = path.basename(filePath);

    try {
      const fileStats = await fsPromises.stat(filePath);
      const file_size = fileStats.size;
      if (file_size > MAX_FILE_SIZE) {
        throw new Error("The file is too large. Please provide a file that is less than 20MB.");
      }

      const formData = new FormData();
      const fileBuffer = await fsPromises.readFile(filePath);
      formData.append('file', new Blob([fileBuffer], { type: 'application/pdf' }), file_name);

      const response = await axios.post(url, formData, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error("Provided file is not a PDF.");
  }
}
