import axios from 'axios';
import { BASE_URL } from './utils';
import { disconnectIntegration } from './integrations/disconnectIntegration';
import { getAuthLink } from './integrations/getAuthLink';
import { updateDriveDirectories } from './integrations/updateDriveDirectories';
import { deleteDocument } from './delete';
import { get } from './get';
import { createSubOrg, getSubOrg, getSubOrgs, deleteSubOrg, updateSubOrg} from './orgManagement'
import {scrapeWebsite} from './scrape'
import { search } from './search';
import {uploadPdf, upload} from './upload'



// import { FormData, Blob } from 'form-data';
// import fs from 'fs';
// import { promises as fsPromises } from 'fs';
// import path from 'path';

export class PongoClient {
  private userId: string;
  private secretKey: string;
  private version: string;

  constructor(userId: string, secretKey: string, version: string = "v1") {
    this.userId = userId;
    this.secretKey = secretKey;
    this.version = version;

    const url = `${BASE_URL}/api/${this.version}/authorize_user`;
    const headers = { secret: this.secretKey, id: this.userId };

    axios.get(url, { headers }).then(response => {
      if (response.status === 401) {
        throw new Error("Invalid credentials");
      } else if (response.status === 500) {
        throw new Error("Server error");
      }
    });
  }

  public async heartbeat(): Promise<any> {
    const url = `${BASE_URL}/api/${this.version}/authorize_user`;
    const headers = { secret: this.secretKey, id: this.userId };

    try {
      const response = await axios.get(url, { headers });
      if (response.status === 401) {
        throw new Error("Invalid credentials");
      } else if (response.status === 500) {
        throw new Error("Server error");
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async search(options: {
    subOrgId?: string,
    query: string,
    startTime?: number,
    endTime?: number,
    sources?: string[],
    numResults?: number,
    maxRerankerResults?: number
  }): Promise<any> {
    return search({
      publicKey: this.userId,
      secretKey: this.secretKey,
      subOrgId: options.subOrgId ?? undefined,
      query: options.query,
      numResults: options.numResults ?? 15,
      maxRerankerResults: options.maxRerankerResults ?? 5,
      startTime: options.startTime,
      endTime: options.endTime,
      sources: options.sources ?? [],
      version: this.version
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
  }): Promise<any> {
    return get({
      publicKey: this.userId,
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
    sourceName: string,
    data: string | string[],
    parentId?: string,
    metadata: any | {},
    timestamp?: number
  }): Promise<any> {
    return upload({
      publicKey: this.userId,
      secretKey: this.secretKey,
      subOrgId: options.subOrgId,
      sourceName: options.sourceName,
      data: options.data,
      metadata: options.metadata,
      parentId: options.parentId,
      timestamp: options.timestamp,
      version: this.version
    });
  }

  /**
   * Uploads a PDF to Pongo for semantic search.
   * @param subOrgId - Sub organization of the data.
   * @param sourceName - Name of the source of the data.
   * @param filePath - Path to the PDF file to be uploaded.
   * @param parentId - ID of the parent document.
   * @param metadata - Metadata for the data. Can be a single dictionary or a list of dictionaries.
   * @param timestamp - Timestamp for the data. Defaults to the current time.
   */
  public async uploadPdf(options: {
    subOrgId: string,
    sourceName: string,
    filePath: string,
    parentId?: string,
    metadata: any | {},
    timestamp?: number
  }): Promise<any> {
    const uploadParams = {
      publicKey: this.userId,
      secretKey: this.secretKey,
      subOrgId: options.subOrgId,
      sourceName: options.sourceName,
      filePath: options.filePath,
      metadata: options.metadata,
      parentId: options.parentId,
      timestamp: options.timestamp,
      version: this.version
    };
    return uploadPdf(uploadParams);
  }

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
  }): Promise<any> {
    const deleteParams = {
      publicKey: this.userId,
      secretKey: this.secretKey,
      subOrgId: options.subOrgId,
      docId: options.docId,
      parentId: options.parentId,
      version: this.version
    };
    return deleteDocument(deleteParams);
  }

  /**
   * Scrapes a website and uploads the data to Pongo for semantic search.
   * @param subOrgId - Sub organization of the data.
   * @param siteName - Name of the site being scraped.
   * @param siteUrl - URL of the site to scrape.
   */
  public async scrapeWebsite(options: {
    subOrgId: string,
    siteName: string,
    siteUrl: string
  }): Promise<any> {
    return scrapeWebsite({
      publicKey: this.userId,
      secretKey: this.secretKey,
      subOrgId: options.subOrgId,
      siteName: options.siteName,
      siteUrl: options.siteUrl,
      version: this.version
    });
  }

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
  }): Promise<any> {
    return getAuthLink({
      publicKey: this.userId,
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
    newDirs: any[],
    integrationId: string
  }): Promise<any> {
    return updateDriveDirectories({
      publicKey: this.userId,
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
  }): Promise<any> {
    return disconnectIntegration({
      publicKey: this.userId,
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
  }): Promise<any> {
    return createSubOrg({
      publicKey: this.userId,
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
  }): Promise<any> {
    return updateSubOrg({
      publicKey: this.userId,
      secretKey: this.secretKey,
      subOrgId: options.subOrgId,
      subOrgName: options.subOrgName,
      version: this.version
    });
  }

  /**
   * Returns list of all sub organizations.
   */
  public async getSubOrgs(): Promise<any> {
    return getSubOrgs({
      publicKey: this.userId,
      secretKey: this.secretKey,
      version: this.version
    });
  }

  /**
   * Retrieves a sub organization by ID.
   * @param subOrgId - ID of the sub organization to retrieve.
   */
  public async getSubOrg(options: {subOrgId: string}): Promise<any> {
    return getSubOrg({
      publicKey: this.userId,
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
  public async deleteSubOrg(options: {subOrgId: string}): Promise<any> {
    return deleteSubOrg({
      publicKey: this.userId,
      secretKey: this.secretKey,
      subOrgId: options.subOrgId,
      version: this.version
    });
  }



}


