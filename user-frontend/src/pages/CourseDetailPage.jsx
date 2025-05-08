import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CheckoutModal from "../components/modal/CheckoutModal";
import { getImageSrc } from "../utils/processBase64";

function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    setLoading(true);
    console.log(courseId);
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
        setLoading(false);
      })
      .catch((err) => {
        console.error("fetch() error:", err);
        setLoading(false);
      });
  }, [courseId]);

  const handleFreeTrial = () => {
    const userInfo = localStorage.getItem("user");
    if (!userInfo) {
      alert("Please sign in to access the free trial");
      return;
    }
    
    navigate(`/course-trial/${course.id}`);
  };

  const handlePurchase = () => {
    const userInfo = localStorage.getItem("user");
    if (!userInfo) {
      alert("Please sign in to purchase this course");
      return;
    }
    navigate(`/payment/${course.id}`)
  };

  const handleCheckDiscount = () => {
    if (discountCode === course?.promocode) {
      setDiscountAmount(25); 
      alert("Promo code applied: 25% discount");
    } else {
      setDiscountAmount(0);
      alert("Invalid promo code");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!course) {
    return <div className="flex justify-center items-center h-screen">Course not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img 
            src={getImageSrc(course.image)} 
            alt={course.name} 
            className="w-full h-auto rounded-lg shadow-md"
          />
          <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-3xl font-bold text-teal-600">{course.price}</span>
              </div>
              {course.outstanding && (
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded">
                  Featured
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-4">
              <button 
                onClick={handleFreeTrial}
                className="bg-white border-2 border-teal-600 text-teal-600 px-6 py-3 rounded-lg hover:bg-teal-50 transition"
              >
                Free Trial
              </button>
              <button 
                onClick={handlePurchase}
                className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition"
              >
                Buy Now
              </button>
            </div>
            <div className="mt-6 text-sm text-gray-600">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Created: {course.date}
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {course.lession ? `${course.lession.length || 0} lessons` : '0 lessons'}
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Category: {course.category}
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {course.certificate ? 'Certificate included' : 'No certificate'}
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Course Details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
          <div className="flex items-center mb-4">
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Status: {course.statusbar}
            </span>
          </div>
          <p className="text-gray-600 mb-6">
            Instructor: <span className="font-medium">{course.actor}</span>
          </p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{course.description}</p>
          </div>
          {course.lession && course.lession.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {course.lession.slice(0, 6).map((lesson, index) => (
                  <div key={index} className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-teal-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{lesson.name || `Lesson ${index + 1}`}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        course={course}
        discountCode={discountCode}
        setDiscountCode={setDiscountCode}
        discountAmount={discountAmount}
        onCheckDiscount={handleCheckDiscount}
      />
    </div>
  );
}

export default CourseDetailPage;
