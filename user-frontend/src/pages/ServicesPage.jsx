import { Link } from "react-router-dom";

function ServicesPage() {
  // Sample courses data
  const courses = [
    {
      id: 1,
      title: "Advanced Web Development",
      description: "Learn modern web development with React, Node.js and more.",
      image: "https://via.placeholder.com/300x200",
      price: 79.99,
      level: "Intermediate"
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      description: "Master the basics of data analysis and visualization.",
      image: "https://via.placeholder.com/300x200",
      price: 89.99,
      level: "Beginner"
    },
    {
      id: 3,
      title: "Mobile App Development",
      description: "Create native mobile apps for iOS and Android.",
      image: "https://via.placeholder.com/300x200",
      price: 99.99,
      level: "Advanced"
    },
    // Add more courses as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-10">Our Services</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105">
            <img 
              src={course.image} 
              alt={course.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-teal-600 font-bold">${course.price}</span>
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                  {course.level}
                </span>
              </div>
              <Link 
                to={`/courses/${course.id}`}
                className="block w-full text-center bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;
