require("dotenv").config({ path: "./config.env" });
const { MongoClient } = require("mongodb");

async function main() {
  const Db = process.env.ATLAS_URI;
  if (!Db) {
    console.error("MongoDB connection string is missing.");
    return;
  }

  const client = new MongoClient(Db);

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const collections = await client.db("FLOKlore").listCollections().toArray();
    console.log("Collections:", collections);

    collections.forEach((collection) => console.log(collection.name));
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  } finally {
    await client.close();
  }
}

main();
