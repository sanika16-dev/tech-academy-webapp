import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // ✅ FIXED HERE
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

        const response = await axios.get(`${apiUrl}/api/courses`);
        setCourses(response.data);
      } catch (err) {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      // ✅ FIXED HERE ALSO
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

      await axios.post(
        `${apiUrl}/api/courses/enroll`,
        { courseId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert('Successfully enrolled!');
      navigate('/my-courses');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to enroll');
    }
  };

  if (loading) return <div className="loader">Loading courses...</div>;
  if (error) return <div className="error-msg">{error}</div>;

  return (
    <div className="courses-container">
      <div className="courses-header">
        <h1>Explore Courses</h1>
        <p>Expand your knowledge with our industry-leading curriculum.</p>
      </div>

      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <img
              src={course.image}
              alt={course.title}
              className="course-image"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80";
              }}
            />

            <div className="course-content">
              <h2>{course.title}</h2>
              <p>{course.description}</p>

              <button
                className="btn enroll-btn"
                onClick={() => handleEnroll(course._id)}
              >
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;