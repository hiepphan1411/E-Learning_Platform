import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid';

const routeLabels = {
  'home': 'Trang chủ',
  'services': 'Khóa học',
  'courses': 'Quản lý khóa học',
  'payment': 'Thanh toán',
  'course-trial': 'Học thử',
  'teacher': 'Giáo viên',
  'settings': 'Cài đặt',
  'my-courses': 'Khóa học của tôi',
  'about': 'Về chúng tôi',
  'success': 'Thành công',
};

const Breadcrumb = () => {
  const location = useLocation();
  const params = useParams();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [dynamicLabels, setDynamicLabels] = useState({});

  useEffect(() => {
    const fetchDynamicData = async () => {
      const newLabels = { ...dynamicLabels };
      
      const courseIdMatch = location.pathname.match(/\/(?:services|courses|payment|course-trial|teacher\/courses\/edit)\/([^/]+)/);
      if (courseIdMatch && courseIdMatch[1]) {
        const courseId = courseIdMatch[1];
        
        if (!dynamicLabels[courseId]) {
          try {
            const response = await fetch(`http://localhost:5000/api/all-data/courses/by/id/${courseId}`);
            if (response.ok) {
              const data = await response.json();
              newLabels[courseId] = data.name || 'Khóa học';
              setDynamicLabels(newLabels);
            }
          } catch (error) {
            console.error('Error fetching course data:', error);
          }
        }
      }
    };
    
    fetchDynamicData();
  }, [location.pathname, dynamicLabels]);

  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(part => part !== '');
    
    const breadcrumbItems = [];
    let currentPath = '';
    
    breadcrumbItems.push({
      label: 'Trang chủ',
      path: '/home',
      key: 'home'
    });
    
    pathParts.forEach((part, index) => {
      currentPath += `/${part}`;
      
      if (part === 'home' && index === 0) return;
      
      if (part.match(/^[0-9a-fA-F]+$/) && part.length > 5) {
        const label = dynamicLabels[part] || 'Chi tiết';
        
        let path = currentPath;
        if (pathParts[index-1] === 'payment' && pathParts[index+1] === 'success') {
          path = `/payment/success/${part}`;
        }
        
        breadcrumbItems.push({
          label,
          path,
          key: part
        });
      } else {
        if (part === 'teacher') {
          breadcrumbItems.push({
            label: 'Giáo viên',
            path: currentPath,
            key: currentPath
          });
          return;
        }

        if (part === 'add' && index > 0 && pathParts[index-1] === 'courses' && pathParts[index-2] === 'teacher') {
          breadcrumbItems.push({
            label: 'Thêm khóa học',
            path: currentPath,
            key: `${currentPath}-add`
          });
          return;
        }
        
        if (part === 'edit' && index > 0 && pathParts[index-1] === 'courses' && pathParts[index-2] === 'teacher') {
          breadcrumbItems.push({
            label: 'Chỉnh sửa khóa học',
            path: currentPath,
            key: `${currentPath}-edit`
          });
          return;
        }

        if (part === 'success' && index > 0 && pathParts[index-1] === 'payment') {
          breadcrumbItems.push({
            label: 'Thanh toán thành công',
            path: currentPath,
            key: `${currentPath}-success`
          });
          return;
        }

        const label = routeLabels[part] || part.charAt(0).toUpperCase() + part.slice(1);
        breadcrumbItems.push({
          label,
          path: currentPath,
          key: currentPath
        });
      }
    });
    
    setBreadcrumbs(breadcrumbItems);
  }, [location.pathname, dynamicLabels]);

  if (location.pathname === '/' || breadcrumbs.length <= 1) return null;

  return (
    <nav className="bg-gray-50 py-3 px-5 rounded-md shadow-sm mb-5">
      <ol className="flex items-center flex-wrap">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.key} className="flex items-center">
            {index === 0 && (
              <HomeIcon className="h-4 w-4 text-gray-600 mr-1" />
            )}
            
            {index !== breadcrumbs.length - 1 ? (
              <>
                <Link
                  to={breadcrumb.path}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {breadcrumb.label}
                </Link>
                <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-2" />
              </>
            ) : (
              <span className="text-gray-700 font-medium">{breadcrumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
