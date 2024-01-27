import { expect } from 'chai';
import { PongoClient } from '../src/client';
import dotenv from 'dotenv';

dotenv.config();

const PONGO_PUBLIC = process.env.PONGO_PUBLIC || 'N/A';
const PONGO_SECRET = process.env.PONGO_SECRET || 'N/A';
const pongoClient = new PongoClient(PONGO_PUBLIC, PONGO_SECRET);

describe('Job Tests', () => {
  it('should get all jobs first page and return status code 200', async () => {
    const res = await pongoClient.getJobs({
      subOrgId: "9ce132df-4360-4c38-8a36-016cd66c678d",
      jobStatus: 'processed'
    });
    expect(res.status).to.equal(200);
  });

  it('should get target job and return status code 200', async () => {
    const res = await pongoClient.getJob({
       subOrgId: "9ce132df-4360-4c38-8a36-016cd66c678d",
      jobId: "job_4b5dcb92-3748-4042-8e5d-5881de463ea4",
    });
    expect(res.status).to.equal(200);
  });
});
