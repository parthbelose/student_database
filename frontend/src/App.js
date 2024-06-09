import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyTeacher from "./pages/Apply_teacher";
import ApplyStudent from "./pages/Apply_student";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Teachers from "./pages/admin/Teachers";
import Profile from "./pages/teacher/Profile";
import Students from "./pages/teacher/Students";
import Courses from "./pages/teacher/courses";
import AddCourse from "./pages/teacher/add-course";
import HallTicketGenerator from "./pages/student/generate_pdf";
import CourseSelectionForm from "./pages/student/course_select";
import Sprofile from "./pages/student/profile";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
              <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/teachers"
              element={
                <ProtectedRoute>
                  <Teachers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/apply-teacher"
              element={
                <ProtectedRoute>
                  < ApplyTeacher/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/apply-student"
              element={
                <ProtectedRoute>
                  < ApplyStudent/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/profile/:id"
              element={
                <ProtectedRoute>
                  < Profile/>
                </ProtectedRoute>
              }
            />
             <Route
              path="/teacher/students"
              element={
                <ProtectedRoute>
                  < Students/>
                </ProtectedRoute>
              }
            />
             <Route
              path="/teacher/courses"
              element={
                <ProtectedRoute>
                  < Courses/>
                </ProtectedRoute>
              }
            />
             <Route
              path="/teacher/add-courses"
              element={
                <ProtectedRoute>
                  < AddCourse/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/hall-ticket"
              element={
                <ProtectedRoute>
                  < HallTicketGenerator/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/register-courses"
              element={
                <ProtectedRoute>
                  < CourseSelectionForm/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/updateProfile"
              element={
                <ProtectedRoute>
                  < Sprofile/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;