import { expect } from 'chai';
import { PongoClient } from '../src/client';
import dotenv from 'dotenv';

dotenv.config();

const PONGO_SECRET = process.env.PONGO_SECRET || 'N/A';

const pongoClient = new PongoClient(PONGO_SECRET);

describe('Organization Management Tests', () => {
  it('should get one sub organization and return status code 200', async () => {
    const res = await pongoClient.getSubOrg({subOrgId: "c8e2b634-f880-46ba-a39d-57f6a07644b4"});
    expect(res.status).to.equal(200);
  });

  it('should get all sub organizations and return status code 200', async () => {
    const res = await pongoClient.getSubOrgs();
    console.log(res.data)
    expect(res.status).to.equal(200);
  });

  it('should create a sub organization and return status code 200', async () => {
    const res = await pongoClient.createSubOrg({subOrgName: "test_sub_org made"});
    expect(res.status).to.equal(200);
  });

  it('should update a sub organization and return status code 200', async () => {
    const res = await pongoClient.updateSubOrg({subOrgName: "yeehaw boys", subOrgId: "0df63126-a0d4-42ad-861c-343375a784f8"});
    expect(res.status).to.equal(200);
  });

  it('should delete a sub organization and return status code 200', async () => {
    const res = await pongoClient.deleteSubOrg({subOrgId: "9c864411-6728-4ee0-9c34-a0eb197b1b11"});
    expect(res.status).to.equal(200);
  });
});
