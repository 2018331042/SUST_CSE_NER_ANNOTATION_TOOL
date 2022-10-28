import axios from "axios";

export default async (req, res) => {
  const { sentence } = req.body;
  console.log({ sentence });
  if (sentence !== undefined) {
    try {
      const response = await axios.post(process.env.AWS_API_GATEWAY, {
        sentence,
      });
      return res.json({ data: response.data });
    } catch (err) {
      console.log({ err });
    }
  } else {
    return res.json({ status: "FAILED", message: "No Sentence Found" });
  }
};
