import { expect } from 'chai';
import { PongoClient } from '../src/client';
import dotenv from 'dotenv';

dotenv.config();

const PONGO_PUBLIC = process.env.PONGO_PUBLIC || 'N/A';
const PONGO_SECRET = process.env.PONGO_SECRET || 'N/A';

describe('Update Google Drive Directories Tests', () => {
  let pongoClient: PongoClient;

  before(() => {
    pongoClient = new PongoClient(PONGO_PUBLIC, PONGO_SECRET);
  });

  it('should update Google Drive directories and return status code 200', async () => {
    const driveDirs = [
      {
        "id": "1JHzi2q7GvVLVxaqW_xiWjW6rWMzmsdhg",
        "name": "Google Drive Stress Test",
        "enabled": false
      }
    ];

    

const response = await pongoClient.updateDriveDirectories({newDirs: driveDirs, integrationId: '1c0c44ae-f4be-422c-b5f5-1ff76762f8aa'});
    expect(response.status).to.equal(200);
    const body = response.data;
    expect(body).to.not.have.property('error');
  });
});
