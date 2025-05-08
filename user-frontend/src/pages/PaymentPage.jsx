import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import QRCode from "qrcode.react";

function PaymentPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState({ minutes: 30, seconds: 0 }); 
  const [userName, setUserName] = useState(""); 
  const [secondsElapsed, setSecondsElapsed] = useState(0); 
  const [orderId, setOrderId] = useState(""); 

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
          name: data.name || "Untitled Course",
          price: data.price || 0,
        };
        setCourse(formattedData);
        setLoading(false);
        
        const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
        setUserName(userInfo.name || "Phước Hiệp Phan");
        
        setOrderId(`COURSE-${courseId}-${Date.now().toString().slice(-8)}`);
      })
      .catch((err) => {
        console.error("fetch() error:", err);
        setLoading(false);
      });
  }, [courseId]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsElapsed(prev => {
        if (prev >= 29) {
          clearInterval(countdown);
          navigate(`/payment/success/${courseId}`);
        }
        return prev + 1;
      });
      
      setTimer(prevTimer => {
        if (prevTimer.seconds > 0) {
          return { ...prevTimer, seconds: prevTimer.seconds - 1 };
        } else if (prevTimer.minutes > 0) {
          return { minutes: prevTimer.minutes - 1, seconds: 59 };
        } else {
          clearInterval(countdown);
          return { minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [navigate, userName]);

  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!course) {
    return <div className="flex justify-center items-center h-screen">Course not found</div>;
  }

  const formattedPrice = `${course.price}₫`;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-pink-600 p-4 flex items-center">
            <img src="../logoMomo.png" alt="MoMo" className="h-10 w-10 mr-2" />
            <h1 className="text-white text-xl font-semibold">Thanh toán MoMo</h1>
          </div>
          
          <div className="flex flex-col md:flex-row">
            {/* Order Information */}
            <div className="p-6 border-r border-gray-200 md:w-2/5">
              <h2 className="text-xl font-semibold mb-4">Thông tin đơn hàng</h2>
              
              <div className="mb-4">
                <p className="text-gray-600 mb-1">Nhà cung cấp</p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-500 rounded-sm flex items-center justify-center mr-2">
                    <span className="text-white text-xs">E</span>
                  </div>
                  <span className="font-medium">E-LEARNING PLATFORM</span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-600 mb-1">Mã đơn hàng</p>
                <p className="font-mono">{orderId}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-600 mb-1">Mô tả</p>
                <p className="truncate">COURSE-{course.name}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-600 mb-1">Số tiền</p>
                <p className="text-2xl font-bold">{formattedPrice}</p>
              </div>
              
              <div className="bg-pink-50 p-4 rounded-md">
                <p className="text-pink-600 font-semibold">Đơn hàng sẽ hết hạn sau:</p>
                <div className="flex justify-center mt-2">
                  <div className="bg-pink-200 text-pink-800 px-3 py-1 rounded-md mx-1">
                    <span className="text-xl">{formatTime(timer.minutes)}</span>
                    <div className="text-xs">Phút</div>
                  </div>
                  <div className="bg-pink-200 text-pink-800 px-3 py-1 rounded-md mx-1">
                    <span className="text-xl">{formatTime(timer.seconds)}</span>
                    <div className="text-xs">Giây</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* QR Code */}
            <div className="p-6 md:w-3/5 flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-6 text-pink-600">Quét mã QR để thanh toán</h2>
              
              <div className="border-4 border-pink-600 rounded-lg p-2 mb-6">
                <img src="../qrPay.png" alt="QR thanh toán"/>
              </div>
              
              <div className="text-center text-gray-600 mb-4">
                <p className="mb-2">
                  <svg className="inline-block w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                  Sử dụng App MoMo hoặc ứng dụng
                </p>
                <p>camera hỗ trợ QR code để quét mã</p>
              </div>
              
              <div className="mt-4 text-center">
                <span className="text-gray-600">Gặp khó khăn khi thanh toán?</span>
                <a href="#" className="text-yellow-600 ml-1 hover:underline">Xem Hướng dẫn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
