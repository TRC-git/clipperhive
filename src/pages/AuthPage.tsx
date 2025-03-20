import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { Info } from 'lucide-react';
import { useLocation, Location } from 'react-router-dom';

// Test user credentials
const TEST_USERS = {
  bookers: [
    { email: 'sarah@creator.com', password: 'password123', username: 'sarahcreates' },
    { email: 'mike@gaming.com', password: 'password123', username: 'mikegaming' },
    { email: 'tech.reviews@email.com', password: 'password123', username: 'techreviewer' }
  ],
  clippers: [
    { email: 'alex@editor.com', password: 'password123', username: 'alexedits' },
    { email: 'emma@clips.com', password: 'password123', username: 'emmaclips' },
    { email: 'chris@viral.com', password: 'password123', username: 'chrisviral' }
  ]
};

interface LocationState {
  from: Location;
}

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<'booker' | 'clipper'>('booker');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTestUsers, setShowTestUsers] = useState(true);

  const { signIn, signUp, user, loading: authLoading } = useAuth();
  const location = useLocation();

  // If we're loading auth state, show nothing to prevent flicker
  if (authLoading) {
    return null;
  }

  // If user is already authenticated, don't show auth page
  if (user) {
    const state = location.state as LocationState | null;
    const from = state?.from?.pathname || '/dashboard';
    window.location.href = from;
    return null;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        console.log('Attempting login...');
        const state = location.state as LocationState | null;
        const from = state?.from?.pathname || '/dashboard';
        await signIn(email, password, from);
        console.log('Login successful');
      } else {
        if (!username) {
          throw new Error('Username is required');
        }
        console.log('Attempting signup...');
        await signUp(email, password, username, role);
        console.log('Signup successful');
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError(err instanceof Error ? err.message : 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  const fillTestUser = (user: { email: string; password: string; username: string }) => {
    setEmail(user.email);
    setPassword(user.password);
    if (!isLogin) {
      setUsername(user.username);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
      >
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Test User Credentials Notice */}
        {showTestUsers && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 relative">
            <button 
              className="absolute top-1 right-1 text-blue-400 hover:text-blue-600"
              onClick={() => setShowTestUsers(false)}
            >
              ✕
            </button>
            <div className="flex">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Test Accounts</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p className="font-semibold mb-1">Brands:</p>
                  <ul className="list-disc pl-5 space-y-1 mb-2">
                    {TEST_USERS.bookers.map((user, idx) => (
                      <li key={`booker-${idx}`}>
                        <button 
                          onClick={() => fillTestUser(user)}
                          className="underline hover:text-blue-800"
                        >
                          {user.email}
                        </button> (password: {user.password})
                      </li>
                    ))}
                  </ul>
                  <p className="font-semibold mb-1">Clippers:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {TEST_USERS.clippers.map((user, idx) => (
                      <li key={`clipper-${idx}`}>
                        <button 
                          onClick={() => fillTestUser(user)}
                          className="underline hover:text-blue-800"
                        >
                          {user.email}
                        </button> (password: {user.password})
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs italic">
                    Click on any email to auto-fill the form. All dummy accounts use password: password123
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
            )}

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  I want to...
                </label>
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'booker' | 'clipper')}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="booker">Book Content (I'm a Brand)</option>
                  <option value="clipper">Create Content (I make clips)</option>
                </select>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              {isLogin ? 'Sign in' : 'Create account'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AuthPage;