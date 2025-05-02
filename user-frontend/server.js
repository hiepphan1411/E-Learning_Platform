import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());

// 1) Kết nối đúng DB coursedb
mongoose
  .connect(
    "mongodb+srv://zangthanks:Giang188@cluster0.p8u7idq.mongodb.net/coursedb?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connected to coursedb"))
  .catch((err) => console.error(err));

const courseSchema = new mongoose.Schema({}, { strict: false });
const Course = mongoose.model("Course", courseSchema);

app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error("Error occurred while fetching courses:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
