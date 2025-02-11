'use client';

import React, {
  createContext, useContext, useEffect, useMemo, useReducer, ReactNode,
} from 'react';
import { AuthPayload, AuthContextType, AuthState } from '@/shared/types/user';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/shared/services/queryClient';
import authService from '../services/auth';

const initialState: AuthState = {
  user: null,
  loading: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthPayload): AuthState => {
  switch (action.type) {
    case 'USER':
      return { ...state, loading: false, ...action.payload };
    case 'LOGOUT':
      return { ...state, user: null, loading: false };
    case 'LOADING':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const value = useMemo(() => ({ ...state, dispatch }), [state]);

  useEffect(() => {
    const user = authService.loadUserInfo();
    if (!user) {
      dispatch({ type: 'LOADING', payload: { loading: false } });
    } else {
      dispatch({ type: 'USER', payload: { user, loading: false } })
    }
  }, []);

  return state.loading ? <>Loading</> : (
    <AuthContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
