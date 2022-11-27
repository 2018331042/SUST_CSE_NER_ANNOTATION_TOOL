export const garbageTags = (tags: Object) => {
  const values = Object.values(tags);
  return values.includes("GARBAGE");
};
