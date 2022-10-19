import jwt from "jsonwebtoken";
export default function createToken(role: String, id: any, email: String) {
  const token = jwt.sign(
    {
      id,
      email,
      role,
    },
    process.env.JWT_SECRET,
  );
  console.log(jwt.verify(token, process.env.JWT_SECRET));
  return token;
}
