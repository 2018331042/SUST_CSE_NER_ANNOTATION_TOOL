import jwt from "jsonwebtoken";
export default function createToken(role: String, id: any, email: String) {
  const token = jwt.sign(
    {
      id,
      email,
      role,
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": [role],
        "x-hasura-default-role": role,
        "x-hasura-user-id": id,
        "x-hasura-user-role": role,
        "x-hasura-user-email": email,
      },
    },
    process.env.HASURA_GRAPHQL_JWT_SECRET,
    { algorithm: "HS256" }
  );
  console.log(jwt.verify(token, process.env.HASURA_GRAPHQL_JWT_SECRET));
  return token;
}
