import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider, useAuth } from "../lib/client/contexts/auth";
import { useRouter } from "next/router";
import Home from ".";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
