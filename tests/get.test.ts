import { expect } from 'chai';
import { PongoClient } from '../src/client';
import dotenv from 'dotenv';

dotenv.config();


const PONGO_SECRET = process.env.PONGO_SECRET || 'N/A';
const pongoClient = new PongoClient(PONGO_SECRET);

describe('Get Tests', () => {
  it('should get a single document and return status code 200', async () => {
    const res = await pongoClient.get({
      subOrgId: "ddde9d10-162a-4b19-8cff-3e52fe8c3643",
      docId: "c631b32c-7278-390f-8934-6cba099d2604",
    });
    expect(res.status).to.equal(200);
  });

  it('should get documents by parent ID and return status code 200', async () => {
    const res = await pongoClient.get({
      subOrgId: "ddde9d10-162a-4b19-8cff-3e52fe8c3643",
      parentId: "462221#4",
    });
    expect(res.status).to.equal(200);
  });
});
