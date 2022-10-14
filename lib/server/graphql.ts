import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

// console.log(ENV.HASURA_GRAPHQL_ADMIN_SECRET);

export const client = new ApolloClient({
  uri: process.env.HASURA_GRAPHQL_ENDPOINT,
  headers: {
    "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  },
  cache: new InMemoryCache(),
});

export const INSERT_USER_ONE = gql`
  mutation INSERT_USER_ONE($email: String!, $name: String!) {
    insert_users_one(object: { email: $email, name: $name }) {
      id
    }
  }
`;
