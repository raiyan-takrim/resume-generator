'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

// Define the user type
export type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

// Define the context type
type UserContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
};

// Create the context with default values
const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  error: null
});

// Create the provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const isLoading = status === 'loading';

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      // Extract user data from session
      const userData: User = {
        id: session.user.id || '',
        name: session.user.name,
        email: session.user.email,
        image: session.user.image
      };
      
      setUser(userData);
    } else if (status === 'unauthenticated') {
      setUser(null);
    } else if (status === 'error') {
      setError(new Error('Failed to authenticate user'));
    }
  }, [session, status]);

  return (
    <UserContext.Provider value={{ user, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
}

// Create a custom hook that only returns user info if available
export function useUser(): { user: User | null; isLoading: boolean; error: Error | null } {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
}

// Create a hook that throws an error if user is not authenticated
export function useAuthenticatedUser(): { user: User; isLoading: boolean } {
  const { user, isLoading, error } = useUser();
  
  if (error) {
    throw error;
  }
  
  if (!isLoading && !user) {
    throw new Error('User is not authenticated');
  }
  
  return { 
    user: user as User, // Type assertion is safe here due to the check above
    isLoading 
  };
}