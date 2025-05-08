import React, { useState } from 'react';
import { FaEnvelope, FaFacebook, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const AboutUsPage = () => {
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitted(true);
    setFeedback({ name: '', email: '', message: '' });
    
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">About HiGi Learning Platform</h1>
        <p className="text-xl text-gray-600">Empowering learners worldwide since 2018</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Story</h2>
        <p className="text-gray-700 mb-4">
          HiGi was founded in 2018 with a simple yet powerful mission: to make quality education accessible to everyone, everywhere. 
          Starting with just 5 courses and a small team of dedicated educators, we've grown to become one of the leading online learning 
          platforms in the region.
        </p>
        <p className="text-gray-700 mb-4">
          Our team consists of passionate educators, technology experts, and learning designers who work together to create 
          engaging, effective, and accessible learning experiences. We believe that education is a fundamental right and that 
          technology can help bridge educational gaps around the world.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">What We Offer</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-medium text-blue-800 mb-2">Technology</h3>
            <p className="text-gray-700">Web development, mobile app development, data science, AI, machine learning, and more.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="text-xl font-medium text-green-800 mb-2">Business</h3>
            <p className="text-gray-700">Marketing, finance, entrepreneurship, management, leadership, and strategic planning.</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="text-xl font-medium text-yellow-800 mb-2">Creative</h3>
            <p className="text-gray-700">Graphic design, video editing, music production, photography, and digital arts.</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Contact Us</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <FaEnvelope className="text-blue-600 mr-3" />
              <span className="text-gray-700">Email: support@higi-learning.com</span>
            </div>
            <div className="flex items-center">
              <FaFacebook className="text-blue-600 mr-3" />
              <span className="text-gray-700">Facebook: facebook.com/higilearning</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-blue-600 mr-3" />
              <span className="text-gray-700">Phone: +84 037678234</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-blue-600 mr-3" />
              <span className="text-gray-700">Address: Số 12 Nguyễn Văn Bảo, Phường 1, Quận Gò Vấp, Thành phố Hồ Chí Minh</span>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Send Us Feedback</h2>
          {isSubmitted ? (
            <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
              Thank you for your feedback! We'll get back to you soon.
            </div>
          ) : null}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={feedback.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={feedback.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={feedback.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>

      {/* Google Maps */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Visit Our Center</h2>
        <div className="h-96 w-full">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.858049705437!2d106.68318771085487!3d10.822173289284914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBUUC5IQ00!5e0!3m2!1svi!2s!4v1746681740641!5m2!1svi!2s"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="HiGi Learning Center Location"
            className="rounded-md"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
