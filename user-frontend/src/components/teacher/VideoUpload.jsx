import { useState } from 'react';

function VideoUpload({ courseId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes('video/')) {
      setVideoFile(file);
      setMessage({ type: '', text: '' });
    } else {
      setVideoFile(null);
      setMessage({ type: 'error', text: 'Please select a valid video file.' });
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setVideoFile(null);
    setUploadProgress(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setMessage({ type: 'error', text: 'Title is required' });
      return;
    }

    if (!videoFile) {
      setMessage({ type: 'error', text: 'Please select a video file' });
      return;
    }

    setIsUploading(true);
    setMessage({ type: '', text: '' });

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', videoFile);
    formData.append('courseId', courseId);

    try {

      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + 5;
          if (newProgress >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return newProgress;
        });
      }, 300);

      const response = await fetch('/api/videos/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.ok) {
        setMessage({ type: 'success', text: 'Video uploaded successfully!' });
        resetForm();
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.message || 'Failed to upload video' });
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setMessage({ type: 'error', text: 'An error occurred while uploading the video' });
    } finally {
      setIsUploading(false);
      setTimeout(() => {
        if (message.type !== 'error') {
          setUploadProgress(0);
        }
      }, 3000);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="font-medium mb-4">Upload New Video</h3>
      
      {message.text && (
        <div className={`p-3 mb-4 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={isUploading}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            disabled={isUploading}
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Video File
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            accept="video/*"
            disabled={isUploading}
          />
          {videoFile && (
            <p className="mt-1 text-sm text-gray-500">
              Selected: {videoFile.name} ({Math.round(videoFile.size / 1024 / 1024 * 10) / 10} MB)
            </p>
          )}
        </div>
        
        {uploadProgress > 0 && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">Upload progress: {uploadProgress}%</p>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isUploading}
          className={`w-full px-4 py-2 text-white font-medium rounded ${
            isUploading 
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          }`}
        >
          {isUploading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
    </div>
  );
}

export default VideoUpload;
