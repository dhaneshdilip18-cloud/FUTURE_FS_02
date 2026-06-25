import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUsers, FiRefreshCw, FiFileText, FiBarChart2, FiCheckCircle, FiTrendingUp, FiSend, FiUserPlus, FiLogIn } from 'react-icons/fi';
import { LoginForm } from '../components/LoginForm';
import { SignUpForm } from '../components/SignUpForm';
import { VisitorLeadForm } from '../components/VisitorLeadForm';

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  onSignUp: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  onVisitorLead: (data: { name: string; email: string; phone: string; company: string; notes: string }) => Promise<{ success: boolean; error?: string }>;
  isLoginLoading: boolean;
  isSignUpLoading: boolean;
  isVisitorLeadLoading: boolean;
}

const FloatingOrb = ({ delay, size, className }: { delay: number; size: string; className: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0.3, 0.5, 0.3],
      scale: [1, 1.1, 1],
      y: [0, -30, 0],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
    className={`absolute rounded-full blur-3xl ${size} ${className}`}
  />
);

const FeatureCard = ({ icon: Icon, title, delay }: { icon: React.ElementType; title: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-center gap-3 text-text/90"
  >
    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
      <Icon className="w-4 h-4 text-primary" />
    </div>
    <span className="text-sm">{title}</span>
  </motion.div>
);

export const Login = ({ onLogin, onSignUp, onVisitorLead, isLoginLoading, isSignUpLoading, isVisitorLeadLoading }: LoginProps) => {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden xl:flex xl:w-[40%] relative overflow-hidden bg-gradient-to-br from-background via-card to-background"
      >
        {/* Animated background orbs */}
        <FloatingOrb delay={0} size="w-96 h-96" className="bg-primary/30 top-10 -left-20" />
        <FloatingOrb delay={2} size="w-72 h-72" className="bg-accent/30 bottom-20 right-10" />
        <FloatingOrb delay={4} size="w-64 h-64" className="bg-success/20 top-1/2 right-1/4" />

        {/* Glass overlay */}
        <div className="absolute inset-0 backdrop-blur-sm" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-10 xl:px-14">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Logo placeholder */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
                <FiTrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-text">LeadFlow CRM</span>
            </div>

            {/* Main heading */}
            <h1 className="text-2xl xl:text-3xl font-bold text-text leading-tight mb-3">
              Client Lead<br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Management System
              </span>
            </h1>

            <p className="text-base text-secondary mb-6 max-w-sm">
              Manage leads, track conversions, and grow your business efficiently.
            </p>

            {/* Feature cards */}
            <div className="space-y-2">
              <FeatureCard icon={FiUsers} title="Lead Tracking" delay={0.5} />
              <FeatureCard icon={FiRefreshCw} title="Status Updates" delay={0.6} />
              <FeatureCard icon={FiFileText} title="Follow-Up Notes" delay={0.7} />
              <FeatureCard icon={FiBarChart2} title="Analytics Dashboard" delay={0.8} />
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-8 flex gap-6"
            >
              <div>
                <p className="text-xl font-bold text-text">10K+</p>
                <p className="text-xs text-secondary">Active Users</p>
              </div>
              <div>
                <p className="text-xl font-bold text-text">50K+</p>
                <p className="text-xs text-secondary">Leads Managed</p>
              </div>
              <div>
                <p className="text-xl font-bold text-text flex items-center gap-1">
                  <FiCheckCircle className="text-success" />
                  98%
                </p>
                <p className="text-xs text-secondary">Satisfaction</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating shape decorations */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 right-20 w-32 h-32 border border-white/10 rounded-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-32 left-20 w-24 h-24 border border-accent/20 rounded-full"
        />
      </motion.div>

      {/* Right Side - Forms */}
      <div className="flex-1 flex flex-col items-center justify-center p-5 lg:p-6 bg-background overflow-y-auto">
        {/* Mobile Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:hidden flex items-center gap-3 mb-6"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
            <FiTrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-text">LeadFlow CRM</span>
        </motion.div>

        <div className="w-full max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-text mb-2">Welcome to LeadFlow</h2>
            <p className="text-secondary text-sm">
              {showSignUp ? 'Create your account to get started' : 'Sign in to your account or submit a lead'}
            </p>
          </motion.div>

          {/* Forms Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-5"
          >
            {/* Auth Form - Sign In / Sign Up */}
            <div className="flex flex-col">
              <div className="mb-3">
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                  showSignUp
                    ? 'bg-accent/10 text-accent'
                    : 'bg-primary/10 text-primary'
                }`}>
                  {showSignUp ? (
                    <>
                      <FiUserPlus className="w-4 h-4" />
                      Create Account
                    </>
                  ) : (
                    <>
                      <FiLogIn className="w-4 h-4" />
                      Sign In
                    </>
                  )}
                </span>
              </div>
              <AnimatePresence mode="wait">
                {showSignUp ? (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SignUpForm onSignUp={onSignUp} isLoading={isSignUpLoading} />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-center mt-4"
                    >
                      <button
                        onClick={() => setShowSignUp(false)}
                        className="text-sm text-secondary hover:text-text transition-colors"
                      >
                        Already have an account?{' '}
                        <span className="text-primary font-medium">Sign In</span>
                      </button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="signin"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LoginForm onLogin={onLogin} isLoading={isLoginLoading} />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-center mt-4"
                    >
                      <button
                        onClick={() => setShowSignUp(true)}
                        className="text-sm text-secondary hover:text-text transition-colors"
                      >
                        Don't have an account?{' '}
                        <span className="text-accent font-medium">Create Account</span>
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Visitor Lead Form */}
            <div className="flex flex-col">
              <div className="mb-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                  <FiSend className="w-4 h-4" />
                  Submit a Lead
                </span>
              </div>
              <VisitorLeadForm onSubmit={onVisitorLead} isLoading={isVisitorLeadLoading} />
            </div>
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-secondary/70 text-xs mt-6"
          >
            Protected by enterprise-grade security. Your data is safe with us.
          </motion.p>
        </div>
      </div>
    </div>
  );
};
