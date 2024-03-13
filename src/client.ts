import axios, { AxiosResponse } from 'axios';

import { deleteDocument } from './delete';
import { get } from './get';
import { disconnectIntegration } from './integrations/disconnectIntegration';
import { getAuthLink } from './integrations/getAuthLink';
import { updateDriveDirectories } from './integrations/updateDriveDirectories';
import { UploadMetadata } from './interfaces';
import { GoogleDriveDirectory } from './interfaces/GoogleDriveDirectory';
import { getJob, getJobs } from './jobs';
import { createSubOrg, deleteSubOrg, getSubOrg, getSubOrgs, updateSubOrg} from './orgManagement'
import { search } from './search';
import { rerank } from './rerank';
import { upload} from './upload'
import { BASE_URL } from './utils';

// import { FormData, Blob } from 'form-data';
// import fs from 'fs';
// import { promises as fsPromises } from 'fs';
// import path from 'path';

export class PongoClient {

  private secretKey: string;
  private version: string;

  constructor(secretKey: string, version = "v1") {
    this.secretKey = secretKey;
    this.version = version;

    const url = `${BASE_URL}/api/${this.version}/authorize_user`;
    const headers = { secret: this.secretKey };

    axios.get(url, { headers }).then(response => {
      if (response.status === 401) {
        throw new Error("Invalid credentials");
      } else if (response.status === 500) {
        throw new Error("Server error");
      }
    });
  }

  public async heartbeat(): Promise<AxiosResponse> {
    const url = `${BASE_URL}/api/${this.version}/authorize_user`;
    const headers = { secret: this.secretKey };
      const response = await axios.get(url, { headers });
      if (response.status === 401) {
        throw new Error("Invalid credentials");
      } else if (response.status === 500) {
        throw new Error("Server error");
      }
      return response;

  }

  public async search(options: {
    subOrgId: string,
    query: string,
    startTime?: number,
    endTime?: number,
    reduceTokens?: boolean,
    sources?: string[],
    numResults?: number,
    sampleSize?: number
  }): Promise<AxiosResponse> {
    return search({
      secretKey: this.secretKey,
      subOrgId: options.subOrgId ?? undefined,
      query: options.query,
      numResults: options.numResults ?? 15,
      sampleSize: options.sampleSize ?? 10,
      reduceTokens: options.reduceTokens ?? false,
      startTime: options.startTime,
      endTime: options.endTime,
      sources: options.sources ?? [],
      version: this.version
    });
  }

    /**
   * Reranks the documents provided, reccomended to pass 50-100 results
   * @param query - Query used to get the initial results
   * @param numResults - Total number of results to return at the end of the operation
   * @param vecSampleSize - Number of vector results to pass into the reranker at the end of Pongo's workflow
   * @param plaintextSampleSize - Number of plain text results to pass into the reranker at the end of Pongo's workflow
   * @param publicMetadataField - Name of the key in each docs object that contains metadata information to be included in pongo's reranking- defaults to "metadata"
   * @param keyField - Name of the key in each docs object to be used as their id, defaults to "id"
   * @param textField - Name of the key in each docs object to do the reranking on, defaults to "text"
   */
  public async rerank(options: {
    query: string,
    docs: any[],
    numResults?: number,
    vecSampleSize?: number,
    sampleSize?: number,
    publicMetadataField?: string,
    keyField?: string,
    plaintextSampleSize?: number,
    textField?: string
  }): Promise<AxiosResponse> {
    return rerank({
      secretKey: this.secretKey,
      query: options.query,
      docs: options.docs,
      numResults: options.numResults,
      vecSampleSize: options.vecSampleSize,
      publicMetadataField: options.publicMetadataField,
      keyField: options.keyField,
      plaintextSampleSize: options.plaintextSampleSize,
      textField: options.textField,
      version: "v1",
    });
  }
  

  /**
   * Retrieves a single document chunk or a list of document chunks from the Pongo API.
   * @param subOrgId - ID of the sub organization.
   * @param docId - ID of the document to be retrieved.
   * @param parentId - ID of the parent document to be retrieved. Will return all chunks of the parent document.
   */
  public async get(options:{
    subOrgId: string,
    docId?: string,
    parentId?: string
  }): Promise<AxiosResponse> {
    return get({
      secretKey: this.secretKey,
      subOrgId: options.subOrgId,
      docId: options.docId,
      parentId: options.parentId,
      version: this.version
    });
  }

  /**
   * Uploads data to Pongo for semantic search.
   * @param subOrgId - Sub organization of the data.
   * @param sourceName - Name of the source of the data.
   * @param data - Data to be uploaded. Can be a single string or a list of strings.
   * @param parentId - ID of the parent document.
   * @param metadata - Metadata for the data. Can be a single dictionary or a list of dictionaries.
   * @param timestamp - Timestamp for the data. Defaults to the current time.
   */
  public async upload( options: {
    subOrgId: string,
    data: string | string[],
    metadata: UploadMetadata | UploadMetadata[],
    timestamp?: number
  }): Promise<AxiosResponse> {
    return upload({
      secretKey: this.secretKey,
      subOrgId: options.subOrgId,
      data: options.data,
      metadata: options.metadata,
      timestamp: options.timestamp,
      version: this.version
    });
  }

  // /**
  //  * Uploads a PDF to Pongo for semantic search.
  //  * @param subOrgId - Sub organization of the data.
  //  * @param sourceName - Name of the source of the data.
  //  * @param filePath - Path to the PDF file to be uploaded.
  //  * @param parentId - ID of the parent document.
  //  * @param metadata - Metadata for the data. Can be a single dictionary or a list of dictionaries.
  //  * @param timestamp - Timestamp for the data. Defaults to the current time.
  //  */
  // public async uploadPdf(options: {
  //   subOrgId?: string,
  //   sourceName: string,
  //   filePath: string,
  //   parentId?: string,
  //   metadata: any | {},
  //   timestamp?: number
  // }): Promise<AxiosResponse> {
  //   const uploadParams = {
  //     secretKey: this.secretKey,
  //     subOrgId: options.subOrgId,
  //     sourceName: options.sourceName,
  //     filePath: options.filePath,
  //     metadata: options.metadata,
  //     parentId: options.parentId,
  //     timestamp: options.timestamp,
  //     version: this.version
  //   };
  //   return uploadPdf(uploadParams);
  // }

  /**
   * Deletes a single document chunk or a list of document chunks from Pongo.
   * @param subOrgId - Sub organization of the data.
   * @param docId - ID of the document to be deleted.
   * @param parentId - ID of the parent document to be deleted. Will delete all chunks of the parent document.
   */
  public async deleteDocument(options: {
    subOrgId: string,
    docId?: string,
    parentId?: string
  }): Promise<AxiosResponse> {
    const deleteParams = {
      secretKey: this.secretKey,
      subOrgId: options.subOrgId,
      docId: options.docId,
      parentId: options.parentId,
      version: this.version
    };
    return deleteDocument(deleteParams);
  }

  // /**
  //  * Scrapes a website and uploads the data to Pongo for semantic search.
  //  * @param subOrgId - Sub organization of the data.
  //  * @param siteName - Name of the site being scraped.
  //  * @param siteUrl - URL of the site to scrape.
  //  */
  // public async scrapeWebsite(options: {
  //   subOrgId: string,
  //   siteName: string,
  //   siteUrl: string
  // }): Promise<AxiosResponse> {
  //   return scrapeWebsite({
  //     secretKey: this.secretKey,
  //     subOrgId: options.subOrgId,
  //     siteName: options.siteName,
  //     siteUrl: options.siteUrl,
  //     version: this.version
  //   });
  // }

  /**
   * Generates a link for sub-organizations to authenticate with other platforms.
   * @param subOrgId - ID of the sub-organization to generate a link for.
   * @param integrationName - Name of the integration to authenticate with.
   * @param redirectUri - The address users will be sent to after completing the authentication process.
   */
  public async getAuthLink(options: {
    subOrgId: string,
    integrationName: string,
    redirectUri: string
  }): Promise<AxiosResponse> {
    return getAuthLink({
      secretKey: this.secretKey,
      subOrgId: options.subOrgId,
      integrationName: options.integrationName,
      redirectUri: options.redirectUri,
      version: this.version
    });
  }

  /**
   * Generates a link that sub-organizations can use to authenticate with other platforms and have their data ingested by Pongo.
   * @param integrationId - ID of the google drive integration to update
   * @param newDirs - Array containing the new "enabled" states of google drive directories, id's and length must be the same
   */
  public async updateDriveDirectories(options: {
    newDirs: GoogleDriveDirectory[],
    integrationId: string
  }): Promise<AxiosResponse> {
    return updateDriveDirectories({
      secretKey: this.secretKey,
      newDirs: options.newDirs,
      integrationId: options.integrationId,
      version: this.version
    });
  }

  /**
   * Disconnect an integration and delete all of its data.
   * @param integrationId - ID of the integration to delete
   * @param integrationName - Name of the integration to delete
   */
  public async disconnectIntegration(options: {
    integrationId: string,
    integrationName: string
  }): Promise<AxiosResponse> {
    return disconnectIntegration({
      secretKey: this.secretKey,
      integrationId: options.integrationId,
      integrationName: options.integrationName,
      version: this.version
    });
  }

  /**
   * Creates a sub organization with a given name, returns the sub organization id and metadata.
   * @param subOrgName - Name of the sub organization to create.
   */
  public async createSubOrg(options: {
    subOrgName: string
  }): Promise<AxiosResponse> {
    return createSubOrg({
      secretKey: this.secretKey,
      subOrgName: options.subOrgName,
      version: this.version
    });
  }

  /**
   * Update a sub organization's name.
   * @param subOrgId - ID of the sub organization to update.
   * @param subOrgName - New name for the sub organization.
   */
  public async updateSubOrg( options: {
    subOrgId: string,
    subOrgName: string
  }): Promise<AxiosResponse> {
    return updateSubOrg({
      secretKey: this.secretKey,
      subOrgId: options.subOrgId,
      subOrgName: options.subOrgName,
      version: this.version
    });
  }

  /**
   * Returns list of all sub organizations.
   */
  public async getSubOrgs(): Promise<AxiosResponse> {
    return getSubOrgs({
      secretKey: this.secretKey,
      version: this.version
    });
  }

  /**
   * Retrieves a sub organization by ID.
   * @param subOrgId - ID of the sub organization to retrieve.
   */
  public async getSubOrg(options: {subOrgId: string}): Promise<AxiosResponse> {
    return getSubOrg({
      secretKey: this.secretKey,
      subOrgId: options.subOrgId,
      version: this.version
    });
  }

  /**
   * Delete a sub organization by ID.
   * Will also delete all data associated with the sub organization.
   * @param subOrgId - ID of the sub organization to delete.
   */
  public async deleteSubOrg(options: {subOrgId: string}): Promise<AxiosResponse> {
    return deleteSubOrg({
      secretKey: this.secretKey,
      subOrgId: options.subOrgId,
      version: this.version
    });
  }

  /**
   * Gets 100 Jobs with the provided status, results are paginated.
   * 
   * @param subOrgId - ID of the sub organization to pull jobs from.  If omitted will use main organization
   * @param jobStatus - Status of jobs to pull.  Valid options are "*", "queued", "processing", "processed"
   * @param page - Page to pull jobs from
   */
  public async getJobs(options: {jobStatus: string, subOrgId: string, page?: number}): Promise<AxiosResponse> {
    return getJobs({
      secretKey: this.secretKey,
      subOrgId: options.subOrgId,
      jobStatus: options.jobStatus,
      page: options.page,
      version: this.version
    });
  }

    /**
   * Get all Jobs with the input status
   * Will also delete all data associated with the sub organization.
   * @param subOrgId - ID of the sub organization to pull jobs from.  If omitted will use main organization
   * @param jobID - ID of the job to pull
   */
  public async getJob(options: {jobId: string, subOrgId: string}): Promise<AxiosResponse> {
    return getJob({
      secretKey: this.secretKey,
      subOrgId: options.subOrgId,
      jobId: options.jobId,
      version: this.version
    });
  }


}


