import { MongoClient } from "mongodb";

const connectDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://NEXTJSUSER:aiD0ppjwUKorq8pB@cluster0.tkycs.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
};

const insertDocument = (client, document) => {
  const db = client.db();
  await db.collection("newsletter").insertOne(document);
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to DB failed" });
      return;
    }

    try {
      await insertDocument(client, { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Insert data failed" });
      return;
    }

    console.log(userEmail);
    res.status(201).json({ message: "Signed up" });
  }
};

export default handler;
