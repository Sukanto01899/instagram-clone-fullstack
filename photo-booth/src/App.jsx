import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/layout";
import ProfilePage from "./pages/ProfilePage";
import CreatePostPage from "./pages/CreatePostPage";
import NotificationsPage from "./pages/NotificationsPage";
import EditProfilePage from "./pages/EditProfilePage";
import HomePage from "./pages/HomePage";
import PostDetailsPage from "./pages/PostDetailsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./wrapper-route/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute> <Layout /> </ProtectedRoute>}>
        <Route index element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/:id" element={<ProfilePage />} />
        <Route path="create" element={<CreatePostPage/>} />
        <Route path="notifications" element={<NotificationsPage/>} />
        <Route path="edit-profile" element={<EditProfilePage/>} />
        <Route path="post/:id" element={<PostDetailsPage/>} />
      </Route>
      <Route path="login" element={<LoginPage/>}/>
      <Route path="signup" element={<SignupPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;
