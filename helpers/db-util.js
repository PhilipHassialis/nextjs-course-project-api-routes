import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://NEXTJSUSER:aiD0ppjwUKorq8pB@cluster0.tkycs.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
};

export const insertDocument = (client, collection, document) => {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
};

export const getAllDocuments = (client, collection, sort) => {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find({ eventId: eventId })
    .sort(sort)
    .toArray();
  return documents;
};
