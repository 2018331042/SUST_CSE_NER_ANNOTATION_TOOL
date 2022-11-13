import Dataset from "../models/dataset";
import Stats from "../models/stats";

export async function FIND_ONE_SENTENCE(id: String) {
  return await Dataset.findOne({ lock: false, skippedBy: { $ne: id } }).lean();
}

export async function LOCK_SENTENCE_TO_USER(senId: String, userId: String) {
  return await Dataset.updateOne(
    { _id: senId },
    { $set: { lock: true, user_id: userId } }
  );
}

export async function FIND_LOCKED_SENTENCE_TO_USER(userId: String) {
  return await Dataset.findOne({
    lock: true,
    user_id: userId,
    isAnnotated: false,
  });
}

export async function GET_ANNOTATED_DATA_AND_USER_INFO() {
  return await Dataset.aggregate([
    { $match: { lock: true, isAnnotated: true } },
    {
      $lookup: {
        from: "users",
        let: {
          userid: "$user_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [
                  {
                    $toString: "$_id",
                  },
                  "$$userid",
                ],
              },
            },
          },
        ],
        as: "user",
      },
    },
  ]);
}

export async function GET_ALL_USER_ANNOTATION_STATS() {
  return await Stats.aggregate([
    {
      $lookup: {
        from: "users",
        let: {
          userid: "$user_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [
                  {
                    $toString: "$_id",
                  },
                  "$$userid",
                ],
              },
            },
          },
        ],
        as: "user",
      },
    },
  ]);
}
