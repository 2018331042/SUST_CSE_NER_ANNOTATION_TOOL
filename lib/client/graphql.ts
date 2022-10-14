import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { useEffect, useState } from "react";

const getToken = () => {
  let token = null;
  if (typeof document !== "undefined") {
    token = "Bearer " + localStorage.getItem("token");
    // console.log({ token });
  }
  return token;
};

export function useApollo() {
  const [client, setClient] = useState<any>();
  const [token, setToken] = useState();

  useEffect(() => {
    console.log("new client created");
    const client = new ApolloClient({
      // @ts-ignoredn
      uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT,
      // credentials: "same-origin",
      credentials: "include",
      headers: {
        authorization: getToken(),
      },
      // link,
      ssrMode: typeof window === "undefined",
      // @ts-ignore
      // headers,
      cache: new InMemoryCache(),
    });
    setClient(client);
  }, [token]);

  useEffect(() => {
    const id = setInterval(() => {
      setToken(getToken());
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return { client };
}
