import { useState, useEffect, useCallback } from 'react';
import { User, getAuth, setAuth } from '../utils/localStorage';

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const DEMO_CREDENTIALS = {
  email: 'admin@crm.com',
  password: 'admin123',
};

const registeredUsers: { name: string; email: string; password: string }[] = [];

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getAuth();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check demo credentials
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      const newUser: User = {
        email,
        name: 'Admin User',
        avatar: undefined,
      };
      setAuth(newUser);
      setUser(newUser);
      setIsLoading(false);
      return { success: true };
    }

    // Check registered users
    const registeredUser = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (registeredUser) {
      const newUser: User = {
        email: registeredUser.email,
        name: registeredUser.name,
        avatar: undefined,
      };
      setAuth(newUser);
      setUser(newUser);
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return { success: false, error: 'Invalid email or password' };
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if email already exists
    const existingUser = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      setIsLoading(false);
      return { success: false, error: 'Email already registered' };
    }

    // Check demo email
    if (email.toLowerCase() === DEMO_CREDENTIALS.email.toLowerCase()) {
      setIsLoading(false);
      return { success: false, error: 'Email already registered' };
    }

    // Register new user
    registeredUsers.push({ name, email, password });

    // Auto login after signup
    const newUser: User = {
      email,
      name,
      avatar: undefined,
    };
    setAuth(newUser);
    setUser(newUser);
    setIsLoading(false);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setAuth(null);
    setUser(null);
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    isLoading,
  };
};
