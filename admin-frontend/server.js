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

app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error("Error occurred while fetching courses:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.put("/api/courses/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(updatedCourse);
  } catch (err) {
    console.error("Error updating course:", err);
    res.status(500).json({ error: "Server error" });
  }
});
app.delete("/api/courses/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("Error deleting course:", err);
    res.status(500).json({ error: "Server error" });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
