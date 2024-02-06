import { expect } from 'chai';
import { PongoClient } from '../src/client';
import dotenv from 'dotenv';

dotenv.config();


const PONGO_SECRET = process.env.PONGO_SECRET || 'N/A';

const pongoClient = new PongoClient(PONGO_SECRET);

describe('Auth Tests', () => {
  it('should properly initialize the client and connect to the server', async () => {
    const heartbeat = await pongoClient.heartbeat();
    expect(heartbeat.status).to.equal(200);
  });
});
