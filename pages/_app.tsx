import type { AppProps } from 'next/app';
import { AppProviders } from 'providers';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProviders>
      <Component {...pageProps} />
    </AppProviders>
  );
}
