import { expect } from 'chai';
import { PongoClient } from '../src/client';
import dotenv from 'dotenv';

dotenv.config();


const PONGO_SECRET = process.env.PONGO_SECRET || 'N/A';

const pongoClient = new PongoClient(PONGO_SECRET);

describe('Delete Tests', function() {
  this.timeout(10000); // Set timeout to 10 seconds

  it('should delete a single document', async () => {
    const res = await pongoClient.deleteDocument({
        // subOrgId: "0df63126-a0d4-42ad-861c-343375a784f8",
        docId: "bcfc0b71-1d2c-3c73-af14-d4ec6b3bdee9",
      })

    expect(res.status).to.equal(200);
  });

  it('should delete a parent document', async () => {
    const res = await pongoClient.deleteDocument({
    //   subOrgId: "0df63126-a0d4-42ad-861c-343375a784f8",
      parentId: "21171997-51f7-4c86-b8f7-9184e41249da",
    });

    expect(res.status).to.equal(200);
  });
});
