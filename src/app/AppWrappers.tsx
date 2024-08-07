// src/AppWrappers.tsx
'use client';
import React, { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';
import theme from '../theme/theme';
import { AuthProvider } from '../contexts/AuthContext';
import 'styles/App.css';
import 'styles/Contact.css';
import 'styles/MiniCalendar.css';

export default function AppWrappers({ children }: { children: ReactNode }) {
  return (
    <CacheProvider>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          {children}
        </ChakraProvider>
      </AuthProvider>
    </CacheProvider>
  );
}
