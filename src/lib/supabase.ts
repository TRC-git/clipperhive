// Mock Supabase client for development without real backend
const createMockClient = () => {
  // Return an object with the same methods as the Supabase client
  // but all operations work with dummy data
  return {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: () => Promise.resolve({ data: {}, error: null }),
      signUp: () => Promise.resolve({ data: { user: { id: 'mock-user-id' } }, error: null }),
      signOut: () => Promise.resolve({ error: null })
    },
    from: (table) => ({
      select: (columns) => ({
        eq: (column, value) => ({
          single: () => Promise.resolve({ data: null, error: null }),
          order: (column, { ascending }) => Promise.resolve({ data: [], error: null })
        }),
        order: (column, { ascending }) => Promise.resolve({ data: [], error: null }),
        is: (column, value) => Promise.resolve({ data: [], error: null })
      }),
      insert: (data) => Promise.resolve({ data: null, error: null }),
      update: (data) => ({
        eq: (column, value) => Promise.resolve({ data: null, error: null })
      }),
      delete: () => ({
        eq: (column, value) => Promise.resolve({ data: null, error: null })
      })
    })
  };
};

// Use mock client instead of real Supabase
export const supabase = createMockClient() as any;