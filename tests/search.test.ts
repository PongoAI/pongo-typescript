import { expect } from 'chai';
import { PongoClient } from '../src/client';
import dotenv from 'dotenv';

dotenv.config();

const PONGO_SECRET = process.env.PONGO_SECRET || 'N/A';

describe('Search Tests', () => {
  let pongoClient: PongoClient;

  before(() => {
    pongoClient = new PongoClient(PONGO_SECRET);
  });

  it('should search and return status code 200', async () => {
    const response = await pongoClient.search({
      subOrgId: "0df63126-a0d4-42ad-861c-343375a784f8",
      query: "How can marchex help automotive dealerships?",
    });
    expect(response.status).to.equal(200);
  });

  it('should search with time range and return status code 200', async () => {
    const response = await pongoClient.search({
      subOrgId: "0df63126-a0d4-42ad-861c-343375a784f8",
      query: "How can marchex help automotive dealerships?",
      startTime: 1600223000,
      endTime: 1701223034,
    });
    expect(response.status).to.equal(200);
  });

  it('should search with source list and return status code 200', async () => {
    const response = await pongoClient.search({
      subOrgId: "0df63126-a0d4-42ad-861c-343375a784f8",
      query: "How can marchex help automotive dealerships?",
      sources: ["pongo_api"]
    });
    expect(response.status).to.equal(200);
  });

  it('should search the parent organization', async () => {
    const response = await pongoClient.search({
      query: "How can marchex help automotive dealerships?",
    });
    expect(response.status).to.equal(200);
  });
});
