export const skippedTags = (tags: Object) => {
  const values = Object.values(tags);
  return values.includes("SKIP");
};
