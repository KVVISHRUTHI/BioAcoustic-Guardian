import { Routes, Route } from "react-router-dom";
import { LandingPage } from "@/components/landing/LandingPage";
import { AuthPage } from "@/components/auth/AuthPage";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import DashboardHome from "@/routes/dashboard.index";
import AlertsPage from "@/routes/dashboard.alerts";
import AudioPage from "@/routes/dashboard.audio";
import BiodiversityPage from "@/routes/dashboard.biodiversity";
import HelpPage from "@/routes/dashboard.help";
import ReportsPage from "@/routes/dashboard.reports";
import SystemPage from "@/routes/dashboard.system";
import TelegramPage from "@/routes/dashboard.telegram";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="alerts" element={<AlertsPage />} />
        <Route path="audio" element={<AudioPage />} />
        <Route path="biodiversity" element={<BiodiversityPage />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="system" element={<SystemPage />} />
        <Route path="telegram" element={<TelegramPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
