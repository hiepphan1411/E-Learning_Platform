import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 1) Kết nối đúng DB coursedb
mongoose
  .connect(
    "mongodb+srv://zangthanks:Giang188@cluster0.p8u7idq.mongodb.net/coursedb?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connected to coursedb"))
  .catch((err) => console.error(err));

const courseSchema = new mongoose.Schema({}, { strict: false });
const Course = mongoose.model("Course", courseSchema);

app.get("/api/all-data/:collectionName", async (req, res) => {
  const { collectionName } = req.params;

  try {
    const data = await mongoose.connection.db
      .collection(collectionName)
      .find()
      .toArray();
    res.json(data);
  } catch (err) {
    console.error(
      `Error fetching data from collection ${collectionName}:`,
      err
    );
    res.status(500).json({ error: "Server error" });
  }
});

app.get(
  "/api/all-data/:collectionName/by/:fieldName/:value",
  async (req, res) => {
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
  }
);

app.get("/api/all-data/courses/by/id/:courseId", async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await mongoose.connection.db
      .collection("courses")
      .findOne({ _id: courseId });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (err) {
    console.error("Error fetching course by ID:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await mongoose.connection.db
      .collection("users")
      .find({})
      .project({ "account.password": 0 })
      .toArray();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.put(
  "/api/all-data/:collectionName/by/:fieldName/:value",
  async (req, res) => {
    const { collectionName, fieldName, value } = req.params;
    const updateData = req.body;

    try {
      const collection = mongoose.connection.db.collection(collectionName);

      const query = { [fieldName]: value };

      const result = await collection.updateOne(query, { $set: updateData });

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Document not found" });
      }

      const updatedDocument = await collection.findOne(query);

      res.json({
        message: `Document in ${collectionName} updated successfully`,
        document: updatedDocument,
      });
    } catch (err) {
      console.error(
        `Error updating document in ${collectionName} by ${fieldName}:`,
        err
      );
      res.status(500).json({ error: "Server error" });
    }
  }
);

app.delete("/api/courses/by-course-id/:courseId", async (req, res) => {
  const { courseId } = req.params;

  try {
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("Error deleting course:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/auth/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await mongoose.connection.db
      .collection("users")
      .findOne({ "account.user_name": username });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Tài khoản không tồn tại",
      });
    }

    if (user.account.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Mật khẩu không chính xác",
      });
    }

    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      typeUser: user.typeUser,
      avatarData: user.avatarData,
    };

    res.json({
      success: true,
      user: userInfo,
    });
  } catch (err) {
    console.error("Sign in error:", err);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi đăng nhập",
    });
  }
});

app.get("/api/course-author/:courseId", async (req, res) => {
  const { courseId } = req.params;

  try {
    const authorCourse = await mongoose.connection.db
      .collection("author_course")
      .findOne({ course_id: courseId });

    if (!authorCourse) {
      return res
        .status(404)
        .json({ error: "Author not found for this course" });
    }

    const author = await mongoose.connection.db
      .collection("users")
      .findOne({ id: authorCourse.user_id });

    if (!author) {
      return res.status(404).json({ error: "user not found" });
    }

    res.json({
      id: author.id,
      name: author.name,
      avatarData: author.avatarData,
    });
  } catch (error) {
    console.error("Error fetching course author: ", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/user-courses/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const userCourses = await mongoose.connection.db
      .collection("user_courses")
      .find({ user_id: userId })
      .toArray();

    if (!userCourses || userCourses.length === 0) {
      return res.status(404).json({
        error: "No courses found for this user",
      });
    }

    const courseIds = userCourses.map((uc) => uc.course_id);

    const courses = await mongoose.connection.db
      .collection("courses")
      .find({ id: { $in: courseIds } })
      .toArray();

    const coursesWithDetails = courses.map((course) => {
      const userCourse = userCourses.find((uc) => uc.course_id === course.id);
      return {
        ...course,
        purchaseDate: userCourse.date_of_purchase,
        expiryDate: userCourse.duration,
        pricePaid: userCourse.price,
      };
    });

    res.json(coursesWithDetails);
  } catch (error) {
    console.error("Error fetching user courses:", error);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
