import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { FeedPage } from "./pages/FeedPage/FeedPage";
import { OfferDetailPage } from "./pages/OfferDetailPage/OfferDetailPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { ApplicationsPage } from "./pages/ApplicationsPage/ApplicationsPage";
import { MyPublicationsPage } from "./pages/MyPublicationsPage/MyPublicationsPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { MainLayout } from "./components/layout/MainLayout/MainLayout";
import { OfferFormPage } from "./pages/OfferFormPage/OfferFormPage";
import "./styles/main.scss";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/offers/:id" element={<OfferDetailPage />} />
              <Route path="/my-offers" element={<MyPublicationsPage />} />
              <Route path="/applications" element={<ApplicationsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="/offers/new" element={<OfferFormPage />} />
            <Route path="/offers/:id/edit" element={<OfferFormPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;