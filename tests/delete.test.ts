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
        subOrgId: "ddde9d10-162a-4b19-8cff-3e52fe8c3643",
        docId: "c631b32c-7278-390f-8934-6cba099d2604",
      })

      console.log(res.data)
    expect(res.status).to.equal(200);
  });




  
  it('should delete a parent document', async () => {
    const res = await pongoClient.deleteDocument({
      subOrgId: "f16fbcf0-bcb2-438b-8ecd-57fb91c8098d",
      parentId: "single_test",
    });

    expect(res.status).to.equal(200);
  });
});
