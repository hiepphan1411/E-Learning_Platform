import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getYouTubeVideoId } from "../utils/videoUtils";
import {
  FaPlay,
  FaArrowLeft,
  FaArrowRight,
  FaSearch,
  FaLock,
  FaCheckCircle,
  FaChevronRight,
  FaChevronLeft,
  FaEdit,
  FaSave,
  FaTimes,
  FaStickyNote,
} from "react-icons/fa";

const CoursePage = () => {
  const [names, setNames] = useState("");
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoSectionRef = useRef(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [notes, setNotes] = useState({});
  const [editingNote, setEditingNote] = useState(false);
  const [currentNote, setCurrentNote] = useState("");
  const noteRef = useRef(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem("courseNotes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const getNoteKey = () => {
    return `${courseId}-L${selectedLesson}-V${selectedVideo}`;
  };

  const saveNote = () => {
    const noteKey = getNoteKey();
    const updatedNotes = { ...notes, [noteKey]: currentNote };
    setNotes(updatedNotes);
    localStorage.setItem("courseNotes", JSON.stringify(updatedNotes));
    setEditingNote(false);
  };

  const startEditingNote = () => {
    const noteKey = getNoteKey();
    setCurrentNote(notes[noteKey] || "");
    setEditingNote(true);
    setTimeout(() => {
      if (noteRef.current) {
        noteRef.current.focus();
      }
    }, 100);
  };

  const cancelEditingNote = () => {
    setEditingNote(false);
  };

  const scrollToVideoSection = () => {
    if (videoSectionRef.current) {
      videoSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("fetch() error:", err);
        setIsLoading(false);
      });
  }, [courseId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-blue-600 font-semibold">
            Đang tải khóa học...
          </p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Không tìm thấy khóa học
          </h2>
          <p className="text-gray-600">
            Khóa học này có thể đã bị xóa hoặc không tồn tại.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all">
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  if (!course.lession) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <h2 className="text-2xl font-bold text-amber-500 mb-4">
            Chưa có bài học
          </h2>
          <p className="text-gray-600">
            Khóa học này hiện chưa có nội dung bài học nào.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all">
            Xem khóa học khác
          </button>
        </div>
      </div>
    );
  }

  const renderVideo = (videoUrl) => {
    const videoId = getYouTubeVideoId(videoUrl);

    if (!videoId) {
      return (
        <div className="bg-gray-100 p-8 rounded-lg text-center shadow-inner border border-gray-200">
          <div className="text-gray-500 text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto mb-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Video không khả dụng hoặc URL không hợp lệ
          </div>
        </div>
      );
    }

    return (
      <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl">
        <iframe
          className="w-full h-[550px] max-h-[550px] min-h-[300px] rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  };

  const handlePreviousVideo = () => {
    if (selectedVideo > 0) {
      setSelectedVideo(selectedVideo - 1);
      setTimeout(scrollToVideoSection, 100);
    } else if (selectedLesson > 0) {
      setSelectedLesson(selectedLesson - 1);
      setSelectedVideo(
        course.lession[selectedLesson - 1].video_courses.length - 1
      );
      setTimeout(scrollToVideoSection, 100);
    }
  };

  const handleNextVideo = () => {
    if (
      selectedVideo <
      course.lession[selectedLesson].video_courses.length - 1
    ) {
      setSelectedVideo(selectedVideo + 1);
      setTimeout(scrollToVideoSection, 100);
    } else if (selectedLesson < course.lession.length - 1) {
      setSelectedLesson(selectedLesson + 1);
      setSelectedVideo(0);
      setTimeout(scrollToVideoSection, 100);
    }
  };

  const filteredLessons =
    course?.lession?.filter((lesson) =>
      lesson.name.toLowerCase().includes(names.toLowerCase())
    ) || [];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto w-full gap-2 relative px-2 pt-2">
        <div
          className={`flex-1 transition-all duration-300 ${
            !sidebarVisible ? "lg:w-full" : ""
          }`}
        >
          <div className="flex items-center mb-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-10 w-1.5 rounded-full mr-2 shadow-md"></div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              {course?.name}
            </h1>

            {sidebarVisible && (
              <button
                onClick={() => setSidebarVisible(!sidebarVisible)}
                className="ml-auto bg-blue-100 text-blue-600 hover:bg-blue-200 p-1.5 rounded-full transition-colors"
                aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
              >
                {sidebarVisible ? <FaChevronRight /> : <FaChevronLeft />}
              </button>
            )}
          </div>

          <div
            className="bg-white p-3 rounded-xl mb-3 border-l-4 border-blue-500 shadow-lg"
            ref={videoSectionRef}
          >
            <h2 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
              <span className="bg-blue-100 text-blue-600 w-7 h-7 rounded-full flex items-center justify-center mr-2 shadow-sm">
                {selectedLesson + 1}
              </span>
              {course?.lession[selectedLesson]?.name}
            </h2>
            <p className="text-xs text-gray-500 mb-2 ml-9">
              Video {selectedVideo + 1} /{" "}
              {course?.lession[selectedLesson]?.video_courses.length}
            </p>

            <div className="video-container rounded-xl overflow-hidden shadow-lg border border-gray-200 mb-2">
              {renderVideo(
                course?.lession[selectedLesson]?.video_courses[selectedVideo]
                  ?.link
              )}
            </div>

            {/* Notes section */}
            <div className="mt-3 border-t border-gray-100 pt-2">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-medium flex items-center">
                  <FaStickyNote className="text-amber-500 mr-2" /> Ghi chú của
                  bạn
                </h3>
                {!editingNote ? (
                  <button
                    onClick={startEditingNote}
                    className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
                  >
                    <FaEdit className="mr-1" /> Sửa ghi chú
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={saveNote}
                      className="text-green-600 hover:text-green-700 flex items-center text-sm"
                    >
                      <FaSave className="mr-1" /> Lưu
                    </button>
                    <button
                      onClick={cancelEditingNote}
                      className="text-red-500 hover:text-red-600 flex items-center text-sm"
                    >
                      <FaTimes className="mr-1" /> Hủy
                    </button>
                  </div>
                )}
              </div>

              {editingNote ? (
                <textarea
                  ref={noteRef}
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  className="w-full mt-2 p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[120px] text-sm"
                  placeholder="Ghi chú của bạn về bài học này..."
                />
              ) : (
                <div className="mt-2 bg-yellow-50 p-2 rounded-md border border-yellow-100 min-h-[60px] text-sm">
                  {notes[getNoteKey()] ? (
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {notes[getNoteKey()]}
                    </p>
                  ) : (
                    <p className="text-gray-400 italic">
                      Chưa có ghi chú cho bài học này
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {sidebarVisible && (
          <div className="lg:w-80 w-full transition-all duration-300">
            <aside className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 sticky top-6">
              <div className="p-3">
                <div className="mb-3 relative">
                  <input
                    type="text"
                    placeholder="Tìm bài học..."
                    className="w-full px-3 py-2 pl-8 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
                    value={names}
                    onChange={(e) => setNames(e.target.value)}
                  />
                  <FaSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-md font-bold text-gray-700 flex items-center">
                    <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs shadow-sm">
                      {course?.lession.length}
                    </span>
                    Danh sách bài học
                  </h3>
                  <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    {filteredLessons.length} bài
                  </span>
                </div>

                <ul className="space-y-2 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
                  {filteredLessons.map((lesson, index) => (
                    <li
                      key={lesson.lession_id || index}
                      className="border border-gray-100 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div
                        className={`flex items-center justify-between cursor-pointer p-2 transition-all hover:bg-blue-50 ${
                          selectedLesson === index
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedLesson(index);
                          setSelectedVideo(0);
                          setTimeout(scrollToVideoSection, 100);
                        }}
                      >
                        <div className="flex items-center">
                          <span
                            className={`flex items-center justify-center rounded-full w-6 h-6 mr-2 text-xs ${
                              selectedLesson === index
                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {index + 1}
                          </span>
                          <span
                            className={`font-medium text-sm ${
                              selectedLesson === index
                                ? "text-blue-700"
                                : "text-gray-700"
                            }`}
                          >
                            {lesson.name}
                          </span>
                        </div>
                        <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full shadow-sm">
                          {lesson.video_courses.length} video
                        </span>
                      </div>

                      {selectedLesson === index && (
                        <ul className="bg-gray-50 border-t border-gray-100">
                          {lesson.video_courses.map((video, vIndex) => (
                            <li
                              key={vIndex}
                              className={`flex items-center p-2 cursor-pointer transition-all hover:bg-gray-100 ${
                                selectedVideo === vIndex ? "bg-blue-50" : ""
                              }`}
                              onClick={() => {
                                setSelectedVideo(vIndex);
                                setTimeout(scrollToVideoSection, 100);
                              }}
                            >
                              <div
                                className={`flex items-center justify-center rounded-full w-5 h-5 mr-2 ${
                                  selectedVideo === vIndex
                                    ? "bg-blue-500 text-white"
                                    : "text-blue-500 border border-blue-200"
                                }`}
                              >
                                <FaPlay className="text-xs" />
                              </div>

                              <div className="flex-1">
                                <div
                                  className={`text-xs font-medium ${
                                    selectedVideo === vIndex
                                      ? "text-blue-700"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {`${index + 1}.${vIndex + 1}. ${video.title}`}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {video.duration || "10:00"} phút
                                </div>
                              </div>

                              {vIndex < selectedVideo && (
                                <FaCheckCircle className="text-green-500 ml-1 text-xs" />
                              )}

                              {notes[`${courseId}-L${index}-V${vIndex}`] && (
                                <FaStickyNote
                                  className="text-amber-400 ml-1 text-xs"
                                  title="Có ghi chú"
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        )}

        {!sidebarVisible && (
          <button
            onClick={() => setSidebarVisible(true)}
            className="fixed right-4 top-20 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-all z-10"
            aria-label="Show sidebar"
          >
            <FaChevronLeft />
          </button>
        )}
      </div>

      <div className="flex overflow-hidden">
        <main className="flex-1 custom-scrollbar overflow-y-auto max-w-5xl mx-auto px-4 py-3"></main>
      </div>

      <div className="bg-white border-t border-gray-200 shadow-md mt-2">
        <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
          <h3 className="text-lg font-semibold mb-1">
            {
              course?.lession[selectedLesson]?.video_courses[selectedVideo]
                ?.title
            }
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            {course?.lession[selectedLesson]?.video_courses[selectedVideo]
              ?.description ||
              "Học tập hiệu quả với bài giảng chất lượng cao. Hãy xem video và thực hành theo các bài tập đi kèm để nắm vững kiến thức."}
          </p>
        </div>
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="text-gray-500 text-xs font-medium">
            Cập nhật tháng 4 năm 2025
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousVideo}
              className="px-4 py-2 bg-white border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-all flex items-center gap-2 font-medium shadow-sm text-sm"
            >
              <FaArrowLeft className="text-xs" /> BÀI TRƯỚC
            </button>
            <button
              onClick={handleNextVideo}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 font-medium shadow-sm text-sm"
            >
              BÀI TIẾP THEO <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
