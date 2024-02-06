import { PongoClient } from '../src/client';
import { expect } from 'chai';
import dotenv from 'dotenv';

dotenv.config();

const PONGO_SECRET = process.env.PONGO_SECRET || 'N/A';

describe('Disconnect Integration Tests', () => {
  it('should disconnect an integration successfully', async () => {
    const pongoClient = new PongoClient(PONGO_SECRET);
    const response = await pongoClient.disconnectIntegration({integrationId: '395d0830-980b-41e9-88dd-06e3ec4642ff', integrationName:'Google Drive'});
    expect(response.status).to.equal(200);
    expect(response.data).to.not.have.property('error');
  });
});
