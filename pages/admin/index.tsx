import React from "react";
import Page from "../../components/page";
import connectDb from "../../lib/db";
import Dataset from "../../lib/models/dataset";

const Admin = () => {
  return (
    <Page>
      <div>Admin Section</div>
    </Page>
  );
};

export default Admin;

export async function getServerSideProps() {
  await connectDb();
  const annotatedData = await Dataset.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    },
    { $match: { lock: true } },
  ]);
  console.log({ annotatedData });
  const data = annotatedData.map((e) => {
    return {
      sentence: e.sentence,
      tags: e.tag_sentence,
      timestamp: e.timestamp.toLocaleDateString(),
      username: e.user[0].name,
    };
  });

  console.log({ data });

  return {
    props: {
      data,
    },
  };
}
