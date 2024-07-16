import { expect } from 'chai';
import { PongoClient } from '../src/client';
import dotenv from 'dotenv';

dotenv.config();

const PONGO_SECRET = process.env.PONGO_SECRET || 'N/A';
const lists_of_results = [
  //Apples results
  [
      {'text': 'Oranges are normally orange, unlike apples', 'metadata': {'source': 'Fruit documentation'}},
      {'text': 'Grapes can be purple or green', 'metadata': {'source': 'Fruit documentation'}},
      {'text': 'Apples can be green or red.', 'metadata': {'source': 'Fruit documentation'}},
      {'text': "If an apple is brown, it's best not to eat it.", 'metadata': {'source': 'Fruit documentation'}}
  ],
  // Mobile phone results
  [
      'Apple released the first iPhone on June 29, 2007',
      'The telephone was invented by Alexander Graham Bell in 1876.',
      'The first long-distance telephone call was made in August 1876, between Brantford and Paris, Ontario',
      'The newest iPhone models are the iPhone 15, it was released on September 22, 2023',
      'The first handheld mobile phone was the Motorola DynaTAC 8000X',
      'Martin Cooper, an engineer at Motorola, is credited with inventing the first handheld cellular mobile phone and making the first mobile phone call'
  ],
  // Squids results
  [
      'Octopuses have three hearts.',
      "A squid's systemic (main) heart has three chambers.",
      'The creature with the most hearts is the earthworm, with 10.',
      'Squids have three hearts- one systemic (main) heart and two branchial hearts'
  ]
]

describe('Filter Tests', () => {
  let pongoClient: PongoClient;

  before(() => {
    pongoClient = new PongoClient(PONGO_SECRET);
  });

  it('should search and return status code 200 with 3 results', async () => {
    const response = await pongoClient.filter({
      query: "How many hearts do squids have?",
      numResults: 3,
      docs: lists_of_results[2],
      observe: true,
      region: 'us-east-1',
      logMetadata: {'source': 'testing'}
    });

    console.log(response.data)
    expect(response.status).to.equal(200);
    expect(response.data.length).to.equal(3);
  });

  it('should search and return status code 200 with 3 results', async () => {
    const response = await pongoClient.filter({
      query: "Who made the mobile phone?",
      numResults: 3,
      docs: lists_of_results[1],
      observe: false,
      region: 'us-east-1',

      logMetadata: {'source': 'testing'}
    });

    console.log(response.data)
    expect(response.status).to.equal(200);
    expect(response.data.length).to.equal(3);
  });

  it('should search and return status code 200 with 3 results', async () => {
    const response = await pongoClient.filter({
      query: "What are apples?",
      numResults: 3,
      docs: lists_of_results[1],
      observe: true,
      region: 'us-west-2',

      logMetadata: {'source': 'testing'}
    });

    console.log(response.data)
    expect(response.status).to.equal(200);
    expect(response.data.length).to.equal(3);
  });

});
