import Dataset from "../models/dataset";

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
