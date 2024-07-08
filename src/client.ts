import axios, { AxiosResponse } from 'axios';

import { semFilter } from './semFilter';
import {observe} from './observe'
import { BASE_URL } from './utils';


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


    /**
   * Filters, scores, and orders the documents provided, reccomended to pass 50-100 results
   * @param query - Query used to get the initial results
   * @param numResults - Total number of results to return at the end of the operation
   * @param vecSampleSize - Number of vector results to pass into the cross-encoder at the end of Pongo's workflow
   * @param plaintextSampleSize - Number of plain text results to pass into the cross-encoder at the end of Pongo's workflow
   * @param publicMetadataField - Name of the key in each docs object that contains metadata information to be included in pongo's scoring- defaults to "metadata"
   * @param keyField - Name of the key in each docs object to be used as their id, defaults to "id"
   * @param textField - Name of the key in each docs object to do the scoring on, defaults to "text"
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
    return semFilter({
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
   * Filters, scores, and orders the documents provided, recommended to pass 75-150 results
   * @param query - Query used to get the initial results
   * @param numResults - Total number of results to return at the end of the operation
   * @param vecSampleSize - Number of vector results to pass into the filter at the end of Pongo's workflow
   * @param plaintextSampleSize - Number of plain text results to pass into the filter at the end of Pongo's workflow
   * @param publicMetadataField - Name of the key in each docs object that contains metadata information to be included in pongo's filtering- defaults to "metadata"
   * @param keyField - Name of the key in each docs object to be used as their id, defaults to "id"
   * @param textField - Name of the key in each docs object to do the filtering on, defaults to "text"
   * @param logMetadata - Optional metadata to log with the observation
   * @param observe - Whether to observe the query and documents
   */
public async filter(options: {
  query: string,
  docs: any[],
  numResults?: number,
  vecSampleSize?: number,
  publicMetadataField?: string,
  keyField?: string,
  plaintextSampleSize?: number,
  textField?: string,
  logMetadata?: Record<string, any>,
  observe?: boolean
}): Promise<AxiosResponse> {
  return semFilter({
    secretKey: this.secretKey,
    query: options.query,
    docs: options.docs,
    numResults: options.numResults,
    vecSampleSize: options.vecSampleSize,
    publicMetadataField: options.publicMetadataField,
    keyField: options.keyField,
    plaintextSampleSize: options.plaintextSampleSize,
    textField: options.textField,
    logMetadata: options.logMetadata,
    observe: options.observe,
    version: this.version,
  });
}


/**
   * Observes the query and documents provided
   * @param query - Query used to get the initial results
   * @param docs - Documents to observe
   * @param logMetadata - Optional metadata to log with the observation
   */
public async observe(options: {
  query: string,
  docs: any[],
  logMetadata?: Record<string, any>
}): Promise<AxiosResponse> {
  return observe({
    secretKey: this.secretKey,
    query: options.query,
    docs: options.docs,
    logMetadata: options.logMetadata,
    version: "v1",
  });
}


}


