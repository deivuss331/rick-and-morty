import type { AppConfig } from 'types';

const appConfig: AppConfig = {
  graphQl: {
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI!,
  },
};

export default appConfig;
