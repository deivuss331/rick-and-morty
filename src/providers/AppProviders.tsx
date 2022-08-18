import { ThemeProvider } from 'styled-components';
import theme from 'theme';

interface AppProvidersProps {
  children: React.ReactElement;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
