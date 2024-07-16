import axios, { AxiosResponse } from 'axios';

import { semFilter } from './semFilter';
import { observe } from './observe';
import { BASE_URL, REGION_MAP } from './utils';

export class PongoClient {
  private secretKey: string;
  private version: string;

  constructor(secretKey: string, version = "v1") {
    this.secretKey = secretKey;
    this.version = version;

    const url = `${BASE_URL}/`;
    const headers = { secret: this.secretKey };

    axios.get(url, { headers }).then(response => {
      if (response.status === 401) {
        throw new Error("Invalid credentials");
      } else if (response.status === 500) {
        throw new Error("Server error");
      }
    });
  }

  public async heartbeat(region: string = "us-west-2"): Promise<AxiosResponse> {
    const baseUrl = REGION_MAP[region] || BASE_URL;
    const url = `${baseUrl}/`;
    const headers = { secret: this.secretKey };
    try {
      const response = await axios.get(url, { headers });
      console.log(response);
      console.log('constructed');
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          throw new Error("Invalid credentials");
        } else if (error.response.status === 500) {
          throw new Error("Server error");
        }
        return error.response;
      }
      throw error;
    }
  }

  /**
   * Filters, scores, and orders the documents provided, recommended to pass 50-100 results
   * @param query - Query used to get the initial results
   * @param docs - Documents to rerank
   * @param numResults - Total number of results to return at the end of the operation
   * @param vecSampleSize - Number of vector results to pass into the cross-encoder at the end of Pongo's workflow
   * @param publicMetadataField - Name of the key in each docs object that contains metadata information to be included in pongo's scoring- defaults to "metadata"
   * @param keyField - Name of the key in each docs object to be used as their id, defaults to "id"
   * @param plaintextSampleSize - Number of plain text results to pass into the cross-encoder at the end of Pongo's workflow
   * @param textField - Name of the key in each docs object to do the scoring on, defaults to "text"
   * @param region - The region to use for the API call
   */
  public async rerank({
    query,
    docs,
    numResults = 10,
    vecSampleSize = 25,
    publicMetadataField = 'metadata',
    keyField = 'id',
    plaintextSampleSize = 5,
    textField = 'text',
    region = "us-west-2"
  }: {
    query: string,
    docs: any[],
    numResults?: number,
    vecSampleSize?: number,
    publicMetadataField?: string,
    keyField?: string,
    plaintextSampleSize?: number,
    textField?: string,
    region?: string
  }): Promise<AxiosResponse> {
    return semFilter({
      secretKey: this.secretKey,
      query,
      docs,
      numResults,
      vecSampleSize,
      publicMetadataField,
      keyField,
      plaintextSampleSize,
      textField,
      version: this.version,
      region
    });
  }
  
  /**
   * Filters, scores, and orders the documents provided, recommended to pass 75-150 results
   * @param query - Query used to get the initial results
   * @param docs - Documents to filter
   * @param numResults - Total number of results to return at the end of the operation
   * @param vecSampleSize - Number of vector results to pass into the filter at the end of Pongo's workflow
   * @param publicMetadataField - Name of the key in each docs object that contains metadata information to be included in pongo's filtering- defaults to "metadata"
   * @param keyField - Name of the key in each docs object to be used as their id, defaults to "id"
   * @param plaintextSampleSize - Number of plain text results to pass into the filter at the end of Pongo's workflow
   * @param textField - Name of the key in each docs object to do the filtering on, defaults to "text"
   * @param logMetadata - Optional metadata to log with the observation
   * @param observe - Whether to observe the query and documents
   * @param region - The region to use for the API call
   */
  public async filter({
    query,
    docs,
    numResults = 10,
    vecSampleSize = 25,
    publicMetadataField = 'metadata',
    keyField = 'id',
    plaintextSampleSize = 5,
    textField = 'text',
    observe = false,
    logMetadata = {},
    region = "us-west-2"
  }: {
    query: string,
    docs: any[],
    numResults?: number,
    vecSampleSize?: number,
    publicMetadataField?: string,
    keyField?: string,
    plaintextSampleSize?: number,
    textField?: string,
    observe?: boolean,
    logMetadata?: Record<string, any>,
    region?: string
  }): Promise<AxiosResponse> {
    return semFilter({
      secretKey: this.secretKey,
      query,
      docs,
      numResults,
      vecSampleSize,
      publicMetadataField,
      keyField,
      plaintextSampleSize,
      textField,
      observe,
      logMetadata,
      version: this.version,
      region
    });
  }

  /**
   * Observes the query and documents provided
   * @param query - Query used to get the initial results
   * @param docs - Documents to observe
   * @param logMetadata - Optional metadata to log with the observation
   * @param region - The region to use for the API call
   */
  public async observe({
    query,
    docs,
    logMetadata = null,
    region = "us-west-2"
  }: {
    query: string,
    docs: any[],
    logMetadata?: Record<string, any> | null,
    region?: string
  }): Promise<AxiosResponse> {
    return observe({
      secretKey: this.secretKey,
      query,
      docs,
      logMetadata,
      version: this.version,
      region
    });
  }
}
