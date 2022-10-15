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
  mutation INSER_USER_ONE(
    $email: String!
    $name: String!
    $password: String!
    $role: String!
  ) {
    insert_users_one(
      object: { email: $email, name: $name, password: $password, role: $role }
    ) {
      id
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query GET_USER_BY_EMAIL($email: String!) {
    users(where: { email: { _eq: $email } }) {
      id
      name
      password
      role
    }
  }
`;

export const GET_USER = gql`
  query GET_USER($id: uuid!) {
    users_by_pk(id: $id) {
      id
      email
      name
      role
    }
  }
`;
