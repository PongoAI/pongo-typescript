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
    const response = await pongoClient.rerank({
      query: "When did LVMH start YSL?",
      numResults: 3,
      docs: [{"ig": 1, "text": "Roses are red", "betadata": {}}, {"ig": 2, "text": "Violets are blue", "betadata": {}}, {"ig": 3, "text": "Roses are red2", "betadata": {}}, {"ig": 4, "text": "Roses are red3", "betadata": {}}],
      publicMetadataField: "betadata",
      keyField: "ig"
    });
    console.log(response.data)
    expect(response.status).to.equal(200);
    expect(response.data.length).to.equal(3);
  });

});
