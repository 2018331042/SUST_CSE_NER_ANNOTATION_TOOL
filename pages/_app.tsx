import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider, useAuth } from "../lib/client/contexts/auth";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationsProvider>
      <ModalsProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ModalsProvider>
    </NotificationsProvider>
  );
}

export default MyApp;
