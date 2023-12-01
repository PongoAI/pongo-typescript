import { expect } from 'chai';
import { PongoClient } from '../src/client';
import dotenv from 'dotenv';

dotenv.config();

const PONGO_PUBLIC = process.env.PONGO_PUBLIC || 'N/A';
const PONGO_SECRET = process.env.PONGO_SECRET || 'N/A';
const pongoClient = new PongoClient(PONGO_PUBLIC, PONGO_SECRET);

describe('Get Tests', () => {
  it('should get a single document and return status code 200', async () => {
    const res = await pongoClient.get({
    //   subOrgId: "0df63126-a0d4-42ad-861c-343375a784f8",
      docId: "be738d73-3326-35bb-825c-9b59a489bace",
    });
    expect(res.status).to.equal(200);
  });

  it('should get documents by parent ID and return status code 200', async () => {
    const res = await pongoClient.get({
    //   subOrgId: "0df63126-a0d4-42ad-861c-343375a784f8",
      parentId: "21171997-51f7-4c86-b8f7-9184e41249da",
    });
    expect(res.status).to.equal(200);
  });
});
