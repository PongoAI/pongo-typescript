import axios, { AxiosResponse } from 'axios';

import { search } from './search';
import { semFilter } from './semFilter';
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
   * Filters, scores, and orders the documents provided, reccomended to pass 50-100 results
   * @param query - Query used to get the initial results
   * @param numResults - Total number of results to return at the end of the operation
   * @param vecSampleSize - Number of vector results to pass into the cross-encoder at the end of Pongo's workflow
   * @param plaintextSampleSize - Number of plain text results to pass into the cross-encoder at the end of Pongo's workflow
   * @param publicMetadataField - Name of the key in each docs object that contains metadata information to be included in pongo's scoring- defaults to "metadata"
   * @param keyField - Name of the key in each docs object to be used as their id, defaults to "id"
   * @param textField - Name of the key in each docs object to do the scoring on, defaults to "text"
   */
  public async semFilter(options: {
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
  



}


