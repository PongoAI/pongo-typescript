import { expect } from 'chai';
import { PongoClient } from '../src/client';
import dotenv from 'dotenv';

dotenv.config();

const PONGO_SECRET = process.env.PONGO_SECRET || 'N/A';

describe('Get Auth Link Tests', () => {
  it('should get an auth link successfully', async () => {
    const pongoClient = new PongoClient(PONGO_SECRET);
    const response = await pongoClient.getAuthLink({subOrgId: '0df63126-a0d4-42ad-861c-343375a784f8', integrationName: 'GitHub', redirectUri: 'google.com'});
    expect(response.status).to.equal(200);
    expect(response.data).to.not.have.property('error');
    expect(response.data).to.have.property('auth_link');
  });
});
