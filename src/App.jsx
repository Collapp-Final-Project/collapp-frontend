import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { FeedPage } from "./pages/FeedPage/FeedPage";
import { OfferDetailPage } from "./pages/OfferDetailPage/OfferDetailPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { ApplicationsPage } from "./pages/ApplicationsPage/ApplicationsPage";
import { MyPublicationsPage } from "./pages/MyPublicationsPage/MyPublicationsPage";
import { AdminPage } from "./pages/AdminPage/AdminPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AdminRoute } from "./routes/AdminRoute";
import { MainLayout } from "./components/layout/MainLayout/MainLayout";
import { OfferFormPage } from "./pages/OfferFormPage/OfferFormPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import "./styles/main.scss";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Feed público: accesible */}
          <Route element={<MainLayout />}>
            <Route path="/feed" element={<FeedPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/offers/:id" element={<OfferDetailPage />} />
              <Route path="/my-offers" element={<MyPublicationsPage />} />
              <Route path="/applications" element={<ApplicationsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="/offers/new" element={<OfferFormPage />} />
            <Route path="/offers/:id/edit" element={<OfferFormPage />} />

            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;