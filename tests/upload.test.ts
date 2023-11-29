import { expect } from 'chai';
import { PongoClient } from '../src/client';
import dotenv from 'dotenv';

dotenv.config();

const PONGO_PUBLIC = process.env.PONGO_PUBLIC || 'N/A';
const PONGO_SECRET = process.env.PONGO_SECRET || 'N/A';

const pongoClient = new PongoClient(PONGO_PUBLIC, PONGO_SECRET);

describe('Upload Tests', () => {
  it('should upload a single item and return status code 200', async () => {
    const testStrData = "test";
    const testSingleMetadata = { test: "metadata" };
    const docId = "test_doc_id";
    const subOrgId = "0df63126-a0d4-42ad-861c-343375a784f8";
    const result = await pongoClient.upload({
      subOrgId: subOrgId,
      sourceName: "test",
      parentId: docId,
      data: testStrData,
      metadata: testSingleMetadata,
    });
    expect(result.status).to.equal(200);
  });

  it('should upload multiple items and return status code 200', async () => {
    const testListData = ["test", "data"];
    const testListMetadata = { test2: "metadata2" };
    const docId = "test_doc_id_lst";
    const subOrgId = "0df63126-a0d4-42ad-861c-343375a784f8";
    const result = await pongoClient.upload({
      subOrgId: subOrgId,
      sourceName: "test",
      parentId: docId,
      data: testListData,
      metadata: testListMetadata,
    });
    expect(result.status).to.equal(200);
  });

  it('should fail to upload with bad authentication and return status code 404', async () => {
    const testListData = ["test", "data"];
    const testListMetadata = [{ test1: "metadata1" }, { test2: "metadata2" }];
    const subOrgId = "0df63126-a0d4-42ad-861c-343375a784fa";
    const result = await pongoClient.upload({
      subOrgId: subOrgId,
      sourceName: "test",
      data: testListData,
      metadata: testListMetadata,
    });
    expect(result.status).to.equal(404);
  });

  it('should fail to upload with bad organization id and return status code 404', async () => {
    const testListData = ["test", "data"];
    const testListMetadata = [{ test1: "metadata1" }, { test2: "metadata2" }];
    const subOrgId = "DNE";
    const result = await pongoClient.upload({
      subOrgId: subOrgId,
      sourceName: "test",
      data: testListData,
      metadata: testListMetadata,
    });
    expect(result.status).to.equal(404);
  });

  it('should upload a PDF and return status code 200', async () => {
    const testPdfPath = "/Users/jamarimorrison/Downloads/Nondisclosure Agreement (2).pdf";
    const testPdfMetadata = { test: "pdf" };
    const docId = "test_pdf_id";
    const subOrgId = "0df63126-a0d4-42ad-861c-343375a784f8";
    const result = await pongoClient.uploadPdf({
      subOrgId: subOrgId,
      sourceName: "test",
      parentId: docId,
      filePath: testPdfPath,
      metadata: testPdfMetadata,
    });
    expect(result.status).to.equal(200);
  });
});
