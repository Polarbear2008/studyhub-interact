import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { TeacherLogin } from "./components/TeacherLogin";
import { StudentLogin } from "./components/StudentLogin";
import { TeacherSignup } from "./components/TeacherSignup";
import { StudentSignup } from "./components/StudentSignup";
import { SubjectsPage } from "./components/SubjectsPage";
import { ResourcesNotesPage } from "./components/ResourcesNotesPage";
import { ResourcesPracticePage } from "./components/ResourcesPracticePage";
import { ResourcesPapersPage } from "./components/ResourcesPapersPage";
import { ResourcesPhysicsSimulationsPage } from "./components/ResourcesPhysicsSimulationsPage";
import { HireTutor } from "./components/HireTutor";
import { PricingPage } from "./components/PricingPage";
import { AdminResourcesPage } from "./components/AdminResourcesPage";
import { AdminSchedulingPage } from "./components/AdminSchedulingPage";
import { AdminAnalyticsPage } from "./components/AdminAnalyticsPage";
import { AdminUsersPage } from "./components/AdminUsersPage";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TermsConditions } from "./components/TermsConditions";
import { Safeguarding } from "./components/Safeguarding";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/teacher-signup" element={<TeacherSignup />} />
          <Route path="/student-signup" element={<StudentSignup />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route 
            path="/resources/notes" 
            element={
              <ProtectedRoute>
                <ResourcesNotesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/resources/practice" 
            element={
              <ProtectedRoute>
                <ResourcesPracticePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/resources/papers" 
            element={
              <ProtectedRoute>
                <ResourcesPapersPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/resources/practice/simulations/physics" 
            element={
              <ProtectedRoute>
                <ResourcesPhysicsSimulationsPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/hire-tutor" element={<HireTutor />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/safeguarding" element={<Safeguarding />} />
          <Route 
            path="/admin/resources" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminResourcesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/scheduling" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminSchedulingPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/analytics" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminAnalyticsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminUsersPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;