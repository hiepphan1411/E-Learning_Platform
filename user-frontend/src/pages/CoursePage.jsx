import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getYouTubeVideoId } from "../utils/videoUtils";

const CoursePage = () => {
  const [names, setNames] = useState("");
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/api/all-data/courses/by/id/${courseId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const formattedData = {
          id: data.id || data._id,
          actor: data.actor || "Unknown",
          image: data.image || data.cover_image || "../avatarAdmin.png",
          name: data.name || "Untitled Course",
          category: data.category
            ? typeof data.category === "object"
              ? `${data.category.field} - ${data.category.name}`
              : data.category
            : "Uncategorized",
          categoryObject: data.category || {
            name: "Uncategorized",
            field: "Other",
          },
          price: data.price || 0,
          date: data.date
            ? new Date(data.date).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          statusbar: data.statusbar || "Chờ duyệt",
          certificate: data.certificate || null,
          lession: data.lession || null,

          outstanding: data.outstanding || false,
          description: data.description || "Chưa có mô tả",
        };
        setCourse(formattedData);
      })
      .catch((err) => {
        console.error("fetch() error:", err);
      });
  }, [courseId]);

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!course.lession) {
    return (
      <div className="flex justify-center items-center h-screen">
        No lesson data available
      </div>
    );
  }

  const renderVideo = (videoUrl) => {
    const videoId = getYouTubeVideoId(videoUrl);

    if (!videoId) {
      return (
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          Invalid video URL
        </div>
      );
    }

    return (
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          className="w-full h-[600px] rounded-lg shadow-md"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex">
        <main className="flex-1 bg-white px-8 py-2">
          <h1 className="text-2xl font-bold mb-4">{course.name}</h1>
          <h2 className="text-xl font-semibold mb-4">
            {course.lession[selectedLesson].name}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              {renderVideo(
                course.lession[selectedLesson].video_courses[selectedVideo].link
              )}
            </div>
          </div>
        </main>

        <aside className="w-1/4 bg-blue-50 border-r">
          <div className="m-4">
            <input
              type="text"
              placeholder="Tìm theo tên bài học"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              value={names}
              onChange={(e) => setNames(e.target.value)}
            />
          </div>
          <ul className="space-y-2">
            {course.lession.map((lesson, index) => (
              <li key={lesson.lession_id}>
                <div
                  className={`flex flex-col items-start justify-between cursor-pointer pl-6 p-2 rounded ${
                    selectedLesson === index ? "bg-blue-100" : ""
                  }`}
                  onClick={() => {
                    setSelectedLesson(index);
                    setSelectedVideo(0);
                  }}
                >
                  <span className="font-bold">
                    {index + 1}. {lesson.name}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {`${index}/${lesson.video_courses.length} | ${lesson.video_courses.length} videos`}
                  </span>
                </div>
                {selectedLesson === index && (
                  <ul className="space-y-1">
                    {lesson.video_courses.map((video, vIndex) => (
                      <li
                        key={vIndex}
                        className={`flex items-center gap-2 cursor-pointer ${
                          selectedVideo === vIndex ? "bg-blue-100" : ""
                        }`}
                        onClick={() => setSelectedVideo(vIndex)}
                      >
                        <span className="text-sm pl-8 py-1">{`${index + 1}.${
                          vIndex + 1
                        }. ${video.title}`}</span>
                        <span
                          className={`${
                            selectedVideo === vIndex
                              ? "text-teal-500"
                              : "text-blue-500"
                          }`}
                        >
                          ▶
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="flex items-center justify-between px-8 py-4 bg-blue-50 border-t">
        <div className="text-gray-500">Cập nhật tháng 4 năm 2025</div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
            ← BÀI TRƯỚC
          </button>
          <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
            BÀI TIẾP THEO →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
