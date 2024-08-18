import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import AuthProvider from "./components/Auth/AuthProvider";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import SelectUserPage from "./pages/SelectUserPage";
import useUserOnline from "./websocket/useUserOnline";
import GroupPage from "./pages/GroupPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatGroupPage from "./pages/ChatGroupPage";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

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
                                <HomePage />
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
                    <Route
                        path="/groups/:id"
                        element={
                            <ProtectedRoute>
                                <ChatGroupPage />
                            </ProtectedRoute>
                        }
                    />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/select-user" element={<SelectUserPage />} />
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    );
};

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <AppRoot />
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
