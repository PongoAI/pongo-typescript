import { expect } from 'chai';
import {PongoClient} from '../src/client'
import dotenv from 'dotenv';

dotenv.config();

const PONGO_PUBLIC = process.env.PONGO_PUBLIC || 'N/A';
const PONGO_SECRET = process.env.PONGO_SECRET || 'N/A';

describe('Web Scraper Tests', () => {
  it('should scrape a website and return status code 200', async () => {
    const pongoClient = new PongoClient(PONGO_PUBLIC, PONGO_SECRET);
    const response = await pongoClient.scrapeWebsite({
    //   subOrgId: "0df63126-a0d4-42ad-861c-343375a784f8",
      siteName: "test_site",
      siteUrl: "https://joinpongo.com/"
    });
    expect(response.status).to.equal(200);
  });
});
