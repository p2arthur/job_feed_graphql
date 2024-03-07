import { getJobs } from './db/jobs.js';
import { getCompanies, getCompany } from './db/companies.js';

//Resolver files are meant to be as clean as possible - Only with the queries

//This is a graphql implementation - I want this resolver to be asyncronous as it'll reach to the database to get data using knex
export const resolvers = {
  //----------------------------------------------------------------------------
  Query: {
    jobs: () => getJobs(),
  },

  //Resolver function for any field and any type - Resolves the value for that field - I want to return a date propertie coming from the DB instead of a createdAt
  Job: {
    //Each object gets access to some arguments - one is the parent = job
    date: (job) => toIsoDate(job.createdAt),
    company: (job) => getCompany(job.companyId),
  },
  //----------------------------------------------------------------------------
};

const toIsoDate = (date) => date.slice(0, 'yyyy-mm-dd'.length);
