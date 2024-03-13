import { expect } from 'chai';
import { PongoClient } from '../src/client';
import dotenv from 'dotenv';

dotenv.config();


const PONGO_SECRET = process.env.PONGO_SECRET || 'N/A';
const pongoClient = new PongoClient(PONGO_SECRET);

describe('Upload Tests', () => {
  it('Should uplaod one document and reutrn status code 200', async () => {
    const res = await pongoClient.upload({
      subOrgId: "f16fbcf0-bcb2-438b-8ecd-57fb91c8098d",
      metadata: {parent_id: 'single_test', source: 'test'},
      data: 'This is what we uploaded'
    }).then(res => {return res});
    expect(res.status).to.equal(200);
  });

  it('Should upload multiple documents and return status code 200', async () => {
    const res = await pongoClient.upload({
        subOrgId: "f16fbcf0-bcb2-438b-8ecd-57fb91c8098d",
        metadata: [{parent_id: 'single_test1', source: 'test'}, {parent_id: 'single_test2', source: 'test'}],
        data: ['This is what we uploaded 1', 'This is what we uploaded 2']
      });
    expect(res.status).to.equal(200);
  });
});
