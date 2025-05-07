import { useEffect, useState } from "react";
import CourseCard from "../components/card/CourseCard";

function ServicePage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    fetch("http://localhost:5000/api/all-data/courses")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("fetch() got:", data);
        const formattedData = data.map((course) => ({
          id: course.id || course._id,
          actor: course.actor || "Unknown",
          image: course.image || course.cover_image || "../avatarAdmin.png",
          name: course.name || "Untitled Course",
          category: course.category
            ? typeof course.category === "object"
              ? `${course.category.field} - ${course.category.name}`
              : course.category
            : "Uncategorized",
          categoryObject: course.category || {
            name: "Uncategorized",
            field: "Other",
          },
          price: course.price || 0,
          date: course.date
            ? new Date(course.date).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          statusbar: course.statusbar || "Chờ duyệt",
          certificate: course.certificate || null,
          video_courses: course.video_courses || [],
          outstanding: course.outstanding || false,

          _original: course,
          description: course.description || "Chưa có mô tả",
        }));
        setCourses(formattedData);
        setFilteredCourses(formattedData);

        const uniqueCategories = [
          ...new Set(
            formattedData.map(
              (course) => course.categoryObject?.field || "Other"
            )
          ),
        ];
        setCategories(["All", ...uniqueCategories]);
      })
      .catch((err) => {
        console.error("fetch() error:", err);
      });
  }, []);

  useEffect(() => {
    let result = [...courses];

    if (searchTerm) {
      result = result.filter(
        (course) =>
          course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter(
        (course) => course.categoryObject?.field === selectedCategory
      );
    }

    if (priceFilter === "free") {
      result = result.filter((course) => course.price === 0);
    } else if (priceFilter === "paid") {
      result = result.filter((course) => course.price > 0);
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setFilteredCourses(result);
  }, [courses, searchTerm, selectedCategory, priceFilter, sortBy]);

  return (
    <div className="flex flex-col px-4 md:px-8 lg:px-12 py-8 bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-xl mb-8">
        <h1 className="text-4xl font-bold mb-2">Find Your Perfect Course</h1>
        <p className="text-lg opacity-90 mb-6">
          Explore our wide range of courses and start learning today
        </p>
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full p-4 pr-12 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="w-6 h-6 text-gray-500 absolute right-4 top-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4 bg-white p-6 rounded-xl shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="font-medium mb-2">Price</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={priceFilter === "all"}
                  onChange={() => setPriceFilter("all")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>All Prices</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={priceFilter === "free"}
                  onChange={() => setPriceFilter("free")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Free</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={priceFilter === "paid"}
                  onChange={() => setPriceFilter("paid")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Paid</span>
              </label>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        <div className="lg:w-3/4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Available Courses</h2>
            <p className="text-gray-600">
              {filteredCourses.length} courses found
            </p>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="bg-white p-8 rounded-xl text-center">
              <h3 className="text-xl font-medium mb-2">No courses found</h3>
              <p className="text-gray-600">Try adjusting your search filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServicePage;
