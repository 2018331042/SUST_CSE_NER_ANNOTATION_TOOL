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
export const GET_SENTENCE = gql`
  query GET_SENTENCE {
    datasets {
      sentence
    }
  }
`;

export const INSERT_DATASETS = gql`
  mutation INSERT_DATASETS($sentence: String!) {
    insert_datasets(objects: { sentence: $sentence }) {
      affected_rows
    }
  }
`;

export const INSERT_TEST_DATASETS = gql`
  mutation INSERT_TEST_DATASETS($sentence: String!) {
    insert_test_datasets(objects: { sentence: $sentence }) {
      affected_rows
    }
  }
`;

export const GET_FIRST_UNLOCK_DATA = gql`
  query GET_FIRST_UNLOCK_DATA {
    test_datasets(where: { lock: { _eq: false } }, distinct_on: lock) {
      serial_no
    }
  }
`;

export const UPDATE_LOCK_DATA = gql`
  mutation UPDATE_LOCK_DATA($serial_no: Int!) {
    update_datasets_by_pk(
      pk_columns: { serial_no: $serial_no }
      _set: { lock: true }
    ) {
      serial_no
    }
  }
`;
