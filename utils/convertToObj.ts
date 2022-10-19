function convertToObj(doc) {
  doc._id = doc._id.toString();
  doc.timestamp = doc.timestamp.toString();
  return doc;
}

export default convertToObj;
