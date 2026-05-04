import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Courses.css';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://tech-academy-api-8txb.onrender.com';
        const response = await axios.get(`${apiUrl}/api/courses/my-courses`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourses(response.data);
      } catch (err) {
        setError('Failed to fetch your courses');
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchMyCourses();
  }, [token]);

  if (loading) return <div className="loader">Loading your courses...</div>;
  if (error) return <div className="error-msg">{error}</div>;

  return (
    <div className="courses-container">
      <div className="courses-header">
        <h1>My Learning</h1>
        <p>Pick up where you left off.</p>
      </div>

      {courses.length === 0 ? (
        <div className="empty-state">
          <p>You haven't enrolled in any courses yet.</p>
        </div>
      ) : (
        <div className="courses-grid">
          {courses.map(course => {
            console.log("My Course data:", course);
            return (
              <div key={course._id} className="course-card">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="course-image" 
                  onError={(e) => e.target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80"}
                />
                <div className="course-content">
                  <h2>{course.title}</h2>
                  <p>{course.description}</p>
                  <button className="btn continue-btn">Continue Learning</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
