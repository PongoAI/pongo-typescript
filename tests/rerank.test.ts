import { expect } from 'chai';
import { PongoClient } from '../src/client';
import dotenv from 'dotenv';

dotenv.config();

const PONGO_SECRET = process.env.PONGO_SECRET || 'N/A';

describe('Rerank Tests', () => {
  let pongoClient: PongoClient;

  before(() => {
    pongoClient = new PongoClient(PONGO_SECRET);
  });

  it('should search and return status code 200 with 5 results', async () => {
    const response = await pongoClient.search({
      subOrgId: "351989f7-0e84-4009-8ec4-ead4463e60a8",
      query: "When did LVMH start YSL?",
      numResults: 5,
      sampleSize: 5
    });
    expect(response.status).to.equal(200);
    expect(response.data.length).to.equal(5);
  });

});
