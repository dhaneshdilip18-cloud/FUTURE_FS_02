import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiCheck, FiUserPlus } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { LoadingSpinner } from './LoadingSpinner';

interface PremiumSignInFormProps {
  onSignIn?: (email: string, password: string) => Promise<{ success: boolean; error?: string }> | void;
  onSignUp?: () => void;
  isLoading?: boolean;
}

export const PremiumSignInForm = ({ onSignIn, onSignUp, isLoading = false }: PremiumSignInFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isFocused, setIsFocused] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (onSignIn) {
      await onSignIn(email, password);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-[420px]"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="relative backdrop-blur-xl rounded-3xl p-8"
        style={{
          background: 'rgba(17, 24, 39, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 0 40px rgba(37, 99, 235, 0.15), 0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Top Section */}
        <div className="text-center mb-8">
          {/* Logo Container */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)',
            }}
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-white mb-2"
          >
            Sign In
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-sm"
          >
            Welcome back! Please sign in to continue.
          </motion.p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* General Error */}
          {errors.general && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm text-center"
            >
              {errors.general}
            </motion.div>
          )}

          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <FiMail
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                  isFocused === 'email' ? 'text-blue-500' : 'text-slate-500'
                }`}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused('email')}
                onBlur={() => setIsFocused(null)}
                className={`w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-slate-500 transition-all duration-300 outline-none ${
                  errors.email ? 'border-red-500/50' : ''
                }`}
                style={{
                  background: '#0F172A',
                  border: isFocused === 'email'
                    ? '1px solid #2563EB'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: isFocused === 'email'
                    ? '0 0 0 3px rgba(37, 99, 235, 0.15), 0 0 20px rgba(37, 99, 235, 0.2)'
                    : 'none',
                }}
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-xs mt-1.5 ml-1"
              >
                {errors.email}
              </motion.p>
            )}
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <FiLock
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                  isFocused === 'password' ? 'text-blue-500' : 'text-slate-500'
                }`}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsFocused('password')}
                onBlur={() => setIsFocused(null)}
                className={`w-full pl-12 pr-12 py-3.5 rounded-xl text-white placeholder-slate-500 transition-all duration-300 outline-none ${
                  errors.password ? 'border-red-500/50' : ''
                }`}
                style={{
                  background: '#0F172A',
                  border: isFocused === 'password'
                    ? '1px solid #2563EB'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: isFocused === 'password'
                    ? '0 0 0 3px rgba(37, 99, 235, 0.15), 0 0 20px rgba(37, 99, 235, 0.2)'
                    : 'none',
                }}
                placeholder="Enter your password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-xs mt-1.5 ml-1"
              >
                {errors.password}
              </motion.p>
            )}
          </motion.div>

          {/* Remember Me & Forgot Password */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-between"
          >
            <label className="flex items-center cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only"
                  disabled={isLoading}
                />
                <div
                  className={`w-5 h-5 rounded-md border transition-all duration-200 flex items-center justify-center ${
                    rememberMe
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 border-transparent'
                      : 'border-slate-600 bg-slate-800/50'
                  }`}
                >
                  <motion.div
                    initial={false}
                    animate={rememberMe ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <FiCheck className="w-3 h-3 text-white" />
                  </motion.div>
                </div>
              </div>
              <span className="ml-2.5 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                Remember me
              </span>
            </label>
            <button
              type="button"
              className="text-sm text-blue-500 hover:text-cyan-400 transition-colors"
              disabled={isLoading}
            >
              Forgot Password?
            </button>
          </motion.div>

          {/* Sign In Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-[52px] rounded-xl text-white font-semibold text-base relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="border-white border-t-transparent" />
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In'
              )}
            </span>
            <motion.div
              className="absolute inset-0 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, #06B6D4 0%, #2563EB 100%)',
              }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                boxShadow: '0 0 30px rgba(37, 99, 235, 0.5), 0 0 60px rgba(6, 182, 212, 0.3)',
              }}
            />
          </motion.button>
        </form>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center my-6"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          <span className="px-4 text-sm text-slate-500">OR</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        </motion.div>

        {/* Social Login Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-2 gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-200"
          >
            <FcGoogle className="w-5 h-5" />
            <span className="text-sm font-medium">Google</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-200"
          >
            <BsGithub className="w-5 h-5" />
            <span className="text-sm font-medium">GitHub</span>
          </motion.button>
        </motion.div>

        {/* Sign Up Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-6 pt-5 border-t border-slate-800"
        >
          <p className="text-sm text-slate-400">
            Don't have an account?{' '}
            <motion.button
              onClick={onSignUp}
              whileHover={{ x: 2 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all inline-flex items-center gap-1"
            >
              Sign Up
              <FiUserPlus className="w-4 h-4 text-cyan-400" />
            </motion.button>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
