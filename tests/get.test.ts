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
      subOrgId: "0df63126-a0d4-42ad-861c-343375a784f8",
      docId: "9e1786c7-f616-30bd-8466-67dde5a1bdc3",
    });
    console.log(res.data)
    expect(res.status).to.equal(200);
  });

  it('should get documents by parent ID and return status code 200', async () => {
    const res = await pongoClient.get({
      subOrgId: "0df63126-a0d4-42ad-861c-343375a784f8",
      parentId: "0f375816-3f52-466a-a653-9b506589b7b1",
    });
    console.log(res.data)
    expect(res.status).to.equal(200);
  });
});
