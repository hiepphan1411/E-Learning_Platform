import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaTrash, FaVideo } from "react-icons/fa";

function CourseForm({ initialData = null }) {
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: {
      name: "",
      field: "",
    },
    cover_image: null,
    coverImagePreview: null,
    lession: [
      {
        lession_id: `lession${Date.now()}`,
        name: "",
        video_courses: [
          {
            title: "",
            link: "",
            createAt: new Date().toISOString(),
          },
        ],
      },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCustomField, setIsCustomField] = useState(false);

  const predefinedFields = [
    { label: "Lập trình" },
    { label: "Thiết kế" },
    { label: "Kinh doanh" },
    { label: "Marketing" },
    { label: "Âm nhạc" },
    { label: "Khác" },
  ];

  const isEditing = Boolean(initialData);

  useEffect(() => {
    if (initialData && isEditing) {
      const matchingField = predefinedFields.find(
        (field) => field.label === initialData.category?.name
      );

      setFormData({
        //id: initialData.id,
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || 0,
        category: {
          name: initialData.category?.name || "",
          field: initialData.category?.field || "",
        },
        cover_image: initialData.cover_image || null,
        coverImagePreview: initialData.cover_image,
        lession: initialData.lession || [
          {
            lession_id: `lession${Date.now()}`,
            name: "",
            video_courses: [
              {
                title: "",
                link: "",
                createAt: new Date().toISOString(),
              },
            ],
          },
        ],
      });

      setIsCustomField(!matchingField);
    }
  }, [initialData, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        cover_image: file,
        coverImagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleCategoryChange = (e) => {
    if (e.target.value === "other") {
      setIsCustomField(true);
      setFormData({
        ...formData,
        category: { ...formData.category, name: "" },
      });
    } else {
      setFormData({
        ...formData,
        category: { ...formData.category, name: e.target.value },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userInfo = JSON.parse(localStorage.getItem("user"));

      let courseId = formData.id;
      if (!isEditing) {
        const idResponse = await fetch(
          "http://localhost:5000/api/latest-course-id"
        );
        const { nextId } = await idResponse.json();
        courseId = nextId;
      }

      const courseData = {
        id: courseId,
        name: formData.name,
        actor: userInfo?.name || "Unknown",
        category: formData.category,
        outstanding: initialData?.outstanding || false,
        cover_image: formData.cover_image,
        price: parseFloat(formData.price),
        date: new Date().toISOString(),
        statusbar: "Chờ duyệt",
        certificate: initialData?.certificate || null,
        description: formData.description,
        lession: formData.lession,
      };

      const response = await fetch(
        isEditing
          ? `http://localhost:5000/api/all-data/courses/by/id/${params.courseId}`
          : "http://localhost:5000/api/all-data/courses",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(courseData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to ${isEditing ? "update" : "create"} course`);
      }

      if (!isEditing) {
        await fetch("http://localhost:5000/api/author-courses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userInfo.id,
            course_id: courseId,
            posted_date: new Date().toISOString(),
          }),
        });
      }

      navigate("/courses");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addLesson = () => {
    setFormData({
      ...formData,
      lession: [
        ...formData.lession,
        {
          lession_id: `lession${Date.now()}`,
          name: "",
          video_courses: [
            {
              title: "",
              link: "",
              createAt: new Date().toISOString(),
            },
          ],
        },
      ],
    });
  };

  const addVideo = (lessonIndex) => {
    const newLessons = [...formData.lession];
    newLessons[lessonIndex].video_courses.push({
      title: "",
      link: "",
      createAt: new Date().toISOString(),
    });
    setFormData({ ...formData, lession: newLessons });
  };

  const removeLesson = (index) => {
    const newLessons = formData.lession.filter((_, i) => i !== index);
    setFormData({ ...formData, lession: newLessons });
  };

  const removeVideo = (lessonIndex, videoIndex) => {
    const newLessons = [...formData.lession];
    newLessons[lessonIndex].video_courses = newLessons[
      lessonIndex
    ].video_courses.filter((_, i) => i !== videoIndex);
    setFormData({ ...formData, lession: newLessons });
  };

  const handleVideoChange = (lessonIndex, videoIndex, field, value) => {
    const newLessons = [...formData.lession];
    newLessons[lessonIndex].video_courses[videoIndex][field] = value;
    setFormData({ ...formData, lession: newLessons });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tên khóa học
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Lĩnh vực
          </label>
          {isCustomField ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.category.field}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: { ...formData.category, name: e.target.value },
                  })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Nhập lĩnh vực khác"
                required
              />
              <button
                type="button"
                onClick={() => {
                  setIsCustomField(false);
                  setFormData({
                    ...formData,
                    category: { ...formData.category, field: "" },
                  });
                }}
                className="mt-1 px-3 py-2 text-gray-600 hover:text-gray-800"
              >
                ↩
              </button>
            </div>
          ) : (
            <select
              value={formData.category.name}
              onChange={handleCategoryChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Chọn lĩnh vực</option>
              {predefinedFields.map((field) => (
                <option key={field.value} value={field.value}>
                  {field.label}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Chuyên ngành
          </label>
          <input
            type="text"
            value={formData.category.field}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: { ...formData.category, field: e.target.value },
              })
            }
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Giá (VND)
        </label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
          min="0"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Mô tả</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows="4"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ảnh bìa
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setFormData({
                  ...formData,
                  cover_image: reader.result,
                });
              };
              reader.readAsDataURL(file);
            }
          }}
          className="mt-1 block w-full"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-lg font-medium text-gray-700">Bài học</label>
          <button
            type="button"
            onClick={addLesson}
            className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            <FaPlus /> Thêm bài học
          </button>
        </div>

        {formData.lession.map((lesson, lessonIndex) => (
          <div key={lesson.lession_id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                value={lesson.name}
                onChange={(e) => {
                  const newLessons = [...formData.lession];
                  newLessons[lessonIndex].name = e.target.value;
                  setFormData({ ...formData, lession: newLessons });
                }}
                placeholder="Tên bài học"
                className="flex-1 px-3 py-2 border rounded-md mr-2"
                required
              />
              <button
                type="button"
                onClick={() => removeLesson(lessonIndex)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </div>

            <div className="space-y-4 pl-4">
              {lesson.video_courses.map((video, videoIndex) => (
                <div key={videoIndex} className="flex items-start gap-2 mt-8">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={video.title}
                      onChange={(e) =>
                        handleVideoChange(
                          lessonIndex,
                          videoIndex,
                          "title",
                          e.target.value
                        )
                      }
                      placeholder="Tiêu đề video"
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={video.link}
                        onChange={(e) =>
                          handleVideoChange(
                            lessonIndex,
                            videoIndex,
                            "link",
                            e.target.value
                          )
                        }
                        placeholder="Link video (URL hoặc file)"
                        className="flex-1 px-3 py-2 border rounded-md"
                        required
                      />
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleVideoChange(
                              lessonIndex,
                              videoIndex,
                              "link",
                              URL.createObjectURL(file)
                            );
                          }
                        }}
                        className="hidden"
                        id={`video-${lessonIndex}-${videoIndex}`}
                      />
                      <label
                        htmlFor={`video-${lessonIndex}-${videoIndex}`}
                        className="cursor-pointer px-3 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                      >
                        <FaVideo />
                      </label>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeVideo(lessonIndex, videoIndex)}
                    className="text-red-600 hover:text-red-800 mt-2"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addVideo(lessonIndex)}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
              >
                <FaPlus /> Thêm video
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => navigate("/courses")}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? isEditing
              ? "Đang cập nhật..."
              : "Đang tạo..."
            : isEditing
            ? "Chỉnh sửa khóa học"
            : "Tạo khóa học"}
        </button>
      </div>
    </form>
  );
}

export default CourseForm;
