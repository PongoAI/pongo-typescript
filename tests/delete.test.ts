import { expect } from 'chai';
import { PongoClient } from '../src/client';
import dotenv from 'dotenv';

dotenv.config();

const PONGO_PUBLIC = process.env.PONGO_PUBLIC || 'N/A';
const PONGO_SECRET = process.env.PONGO_SECRET || 'N/A';

const pongoClient = new PongoClient(PONGO_PUBLIC, PONGO_SECRET);

describe('Delete Tests', () => {
  it('should delete a single document', async () => {
    const res = await pongoClient.deleteDocument({
      subOrgId="c3f56583-625e-43b3-89aa-970b24232600",
      docId: "1499d8a0-8840-3626-8ca0-394113eff353",
    });

    expect(res.status).to.equal(200);
  });

  it('should delete a parent document', async () => {
    const res = await pongoClient.deleteDocument({
      subOrgId: "c3f56583-625e-43b3-89aa-970b24232600",
      parentId: "test_doc_id_lst",
    });

    expect(res.status).to.equal(200);
  });
});
