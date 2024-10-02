import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignupForm from './Auth/SignupForm';
import LoginForm from './Auth/LoginForm';
import AdminDashboard from './pages/AdminDashboard';
import Adminaddcourses from './controller/adminpages/Adminaddcourses';
import Adminviewcourses from './controller/adminpages/Adminviewcourses';
import TeacherDashboard from './pages/TeacherDashboard';
import Teacheraddassignment from './controller/teacherpages/teacheraddassignment';
import Teachermanageassignments from './controller/teacherpages/Teachermanageassignments';
// import StudentDashboard from './pages/StudentDashboard';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/adminaddcourses" element={<Adminaddcourses />} />
        <Route path="/dashboard/adminviewcourses" element={<Adminviewcourses />} />
        <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
        <Route path="/dashboard/teacheraddassignment" element={<Teacheraddassignment />} />
        <Route path="/dashboard/teacher/assignments" element={<Teachermanageassignments />} />
        {/* <Route path="/dashboard/student" element={<StudentDashboard />} /> */}
      </Routes>

  );
}

export default App;
