import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider, useAuth } from "../lib/client/contexts/auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
