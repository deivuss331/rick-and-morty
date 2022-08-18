import { ThemeProvider } from 'styled-components';
import theme, { GlobalStyle } from 'theme';

import 'normalize.css';

interface AppProvidersProps {
  children: React.ReactElement;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
