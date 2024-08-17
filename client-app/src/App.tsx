import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import AuthProvider from "./components/Auth/AuthProvider";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Layout from "./components/Layout";
import FriendsPage from "./pages/FriendsPage";
import SelectUserPage from "./pages/SelectUserPage";
import useUserOnline from "./websocket/useUserOnline";
import GroupPage from "./pages/GroupPage";

const AppRoot = () => {
  useUserOnline();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <FriendsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:id"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/groups"
            element={
              <ProtectedRoute>
                <GroupPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/select-user" element={<SelectUserPage />} />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoot />
    </AuthProvider>
  );
}

export default App;
