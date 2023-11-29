import { expect } from 'chai';
import { PongoClient } from '../src/client';
import dotenv from 'dotenv';

dotenv.config();

const PONGO_PUBLIC = process.env.PONGO_PUBLIC || 'N/A';
const PONGO_SECRET = process.env.PONGO_SECRET || 'N/A';

const pongoClient = new PongoClient(PONGO_PUBLIC, PONGO_SECRET);

describe('Delete Tests', function() {
  this.timeout(10000); // Set timeout to 10 seconds

  it('should delete a single document', async () => {
    const res = await pongoClient.deleteDocument({
        subOrgId: "0df63126-a0d4-42ad-861c-343375a784f8",
        docId: "1af0dd27-fdfd-3484-9cb4-1dbbe667fcf6",
      })

    expect(res.status).to.equal(200);
  });

  it('should delete a parent document', async () => {
    const res = await pongoClient.deleteDocument({
      subOrgId: "0df63126-a0d4-42ad-861c-343375a784f8",
      parentId: "ec098d4c-db72-42ba-98e2-478f519e34fe",
    });

    expect(res.status).to.equal(200);
  });
});
