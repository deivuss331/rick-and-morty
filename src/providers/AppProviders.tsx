import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import theme, { GlobalStyle } from 'theme';
import apolloClient from 'apolloClient';

import 'normalize.css';

interface AppProvidersProps {
  children: React.ReactElement;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ApolloProvider>
  );
}
