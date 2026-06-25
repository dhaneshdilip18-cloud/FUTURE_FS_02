import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './hooks/useAuth';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Leads } from './pages/Leads';
import { AddLead } from './pages/AddLead';
import { Analytics } from './pages/Analytics';
import { SettingsPage } from './pages/Settings';
import { Lead, getLeads, getSettings, saveSettings, addLead } from './utils/localStorage';
import { generateSampleLeads } from './data/sampleLeads';

function AppContent() {
  const { user, isAuthenticated, login, signup, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [settings, setSettings] = useState(getSettings());
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [isVisitorLeadLoading, setIsVisitorLeadLoading] = useState(false);

  useEffect(() => {
    const storedLeads = getLeads();
    if (storedLeads.length === 0) {
      const sampleLeads = generateSampleLeads();
      setLeads(sampleLeads);
    } else {
      setLeads(storedLeads);
    }
  }, []);

  const refreshLeads = () => {
    setLeads(getLeads());
  };

  const handleSaveSettings = (newSettings: ReturnType<typeof getSettings>) => {
    saveSettings(newSettings);
    setSettings(newSettings);
  };

  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  const handleLogin = async (email: string, password: string) => {
    setIsLoginLoading(true);
    const result = await login(email, password);
    setIsLoginLoading(false);
    return result;
  };

  const handleSignUp = async (name: string, email: string, password: string) => {
    setIsSignUpLoading(true);
    const result = await signup(name, email, password);
    setIsSignUpLoading(false);
    return result;
  };

  const handleVisitorLead = async (data: { name: string; email: string; phone: string; company: string; notes: string }) => {
    setIsVisitorLeadLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    addLead({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      source: 'Website',
      status: 'New',
      notes: data.notes,
    });
    refreshLeads();
    setIsVisitorLeadLoading(false);
    return { success: true };
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login
                onLogin={handleLogin}
                onSignUp={handleSignUp}
                onVisitorLead={handleVisitorLead}
                isLoginLoading={isLoginLoading}
                isSignUpLoading={isSignUpLoading}
                isVisitorLeadLoading={isVisitorLeadLoading}
              />
            )
          }
        />
        <Route
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
              <DashboardLayout user={user} onLogout={handleLogout} onSearch={handleSearch} />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard leads={leads} />} />
          <Route path="/leads" element={<Leads leads={leads} refreshLeads={refreshLeads} />} />
          <Route path="/add-lead" element={<AddLead />} />
          <Route path="/analytics" element={<Analytics leads={leads} />} />
          <Route path="/settings" element={<SettingsPage settings={settings} onSaveSettings={handleSaveSettings} />} />
        </Route>
        <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
