import { expect } from 'chai';
import { PongoClient } from '../src/client';
import dotenv from 'dotenv';

dotenv.config();


const PONGO_SECRET = process.env.PONGO_SECRET || 'N/A';
const pongoClient = new PongoClient(PONGO_SECRET);

describe('Job Tests', () => {
  it('should get all jobs first page and return status code 200', async () => {
    const res = await pongoClient.getJobs({
      subOrgId: "f16fbcf0-bcb2-438b-8ecd-57fb91c8098d",
      jobStatus: '*'
    });
    console.log(res.data)
    expect(res.status).to.equal(200);
  });

  it('should get target job and return status code 200', async () => {
    const res = await pongoClient.getJob({
       subOrgId: "f16fbcf0-bcb2-438b-8ecd-57fb91c8098d",
      jobId: "job_69da0cd6-ca2b-480a-b2f9-1ca43bced39f",
    });
    expect(res.status).to.equal(200);
  });
});
