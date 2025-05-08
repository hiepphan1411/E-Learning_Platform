import React from "react";
import { useNavigate } from "react-router-dom";

function CheckoutModal({
  isOpen,
  onClose,
  course,
  discountCode,
  setDiscountCode,
  discountAmount,
  onCheckDiscount,
}) {
  const navigate = useNavigate();

  if (!isOpen || !course) return null;

  // Use course.price instead of currentPrice
  const originalPrice = course.price || 0;
  const finalPrice =
    discountAmount > 0
      ? originalPrice * (1 - discountAmount / 100)
      : originalPrice;

  const handleProceedToPayment = () => {
    alert("Proceeding to payment...");
    navigate("/payment", {
      state: {
        courseId: course.id,
        courseTitle: course.name, // Changed from title to name
        finalPrice: finalPrice,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-teal-600 text-white px-6 py-4">
          <h3 className="text-xl font-bold">Confirm Purchase</h3>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">{course.name}</h4>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Original Price:</span>
              <span className="text-gray-600">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(originalPrice)}
              </span>
            </div>

            {course.discountPercentage > 0 && (
              <div className="flex justify-between mb-4">
                <span className="text-green-600">Course Discount:</span>
                <span className="text-green-600">
                  -${(course.originalPrice - course.currentPrice).toFixed(2)}
                </span>
              </div>
            )}

            <div className="border-t border-gray-200 my-4 pt-4">
              <div className="flex items-end gap-2 mb-4">
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Promo Code
                  </label>
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Enter promo code"
                  />
                </div>
                <button
                  onClick={onCheckDiscount}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Apply
                </button>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between mb-4">
                  <span className="text-green-600">Promo Discount:</span>
                  <span className="text-green-600">
                    -
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(originalPrice * (discountAmount / 100))}
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 my-4 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(finalPrice)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleProceedToPayment}
              className="px-5 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutModal;
