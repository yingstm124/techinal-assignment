import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import AuthProvider from "./components/Auth/AuthProvider";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Layout from "./components/Layout";
import FriendsPage from "./pages/FriendsPage";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Layout />
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
                    </Route>
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
