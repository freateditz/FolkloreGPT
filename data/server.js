import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "./config.env" });

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB Atlas using environment variable
const mongoUri = process.env.ATLAS_URI + "FLOKlore?retryWrites=true&w=majority";
mongoose.connect(mongoUri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => console.log("✅ MongoDB connected"))
 .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Schema & model (collection = Contact)
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  category: String,
  message: String,
  culture: String,
  consent: Boolean,
  submittedAt: String,
}, { collection: "Contact" }); // 👈 ensure it uses Contact collection

const Contact = mongoose.model("Contact", contactSchema);

// ✅ POST API
app.post("/api/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json({ success: true, contact });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));

app.post("/api/stories", async (req, res) => {
  try {
    const db = client.db("FLOKlore");
    const storiesCollection = db.collection("Stories");

    const result = await storiesCollection.insertOne(req.body);
    res.status(201).json({ message: "Story saved", id: result.insertedId });
  } catch (error) {
    console.error("Error saving story:", error);
    res.status(500).json({ message: "Error saving story" });
  }
});
