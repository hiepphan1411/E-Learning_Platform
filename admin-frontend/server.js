import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 1) Kết nối đúng DB coursedb
mongoose.connect(
  "mongodb+srv://phanphuochiep2004:pph14112004@cluster0.p8u7idq.mongodb.net/coursedb?retryWrites=true&w=majority"
)
  .then(() => console.log("MongoDB connected to coursedb"))
  .catch((err) => console.error(err));

const courseSchema = new mongoose.Schema({}, { strict: false });
const Course = mongoose.model("Course", courseSchema); 

app.get("/api/all-data/:collectionName", async (req, res) => {
  const { collectionName } = req.params;

  try {
    const data = await mongoose.connection.db.collection(collectionName).find().toArray();
    res.json(data);
  } catch (err) {
    console.error(`Error fetching data from collection ${collectionName}:`, err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/all-data/:collectionName/by/:fieldName/:value", async (req, res) => {
  const { collectionName, fieldName, value } = req.params;

  try {
    const collection = mongoose.connection.db.collection(collectionName);

    const query = { [fieldName]: value };

    const document = await collection.findOne(query);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.json(document);
  } catch (err) {
    console.error(`Error querying ${collectionName} by ${fieldName}:`, err);
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/api/all-data/:collectionName/by/:fieldName/:value", async (req, res) => {
  const { collectionName, fieldName, value } = req.params;
  const updateData = req.body;

  try {
    const collection = mongoose.connection.db.collection(collectionName);

    const query = { [fieldName]: value };
    
    const result = await collection.updateOne(
      query, 
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Document not found" });
    }

    const updatedDocument = await collection.findOne(query);

    res.json({ 
      message: `Document in ${collectionName} updated successfully`, 
      document: updatedDocument 
    });
  } catch (err) {
    console.error(`Error updating document in ${collectionName} by ${fieldName}:`, err);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/all-data/:collectionName/by/:fieldName/:value", async (req, res) => {
  const { collectionName, fieldName, value } = req.params;

  try {
    const collection = mongoose.connection.db.collection(collectionName);

    const query = { [fieldName]: value };
    
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.json({ 
      message: `Document in ${collectionName} deleted successfully`
    });
  } catch (err) {
    console.error(`Error deleting document in ${collectionName} by ${fieldName}:`, err);
    res.status(500).json({ error: "Server error" });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
