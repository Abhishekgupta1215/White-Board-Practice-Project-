'use client';

import React from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { LoginLink, RegisterLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import Image from 'next/image';

function AuthButton() {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isLoading) {
    return (
      <div className="flex items-center gap-4">
        <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {user.picture && (
            <Image 
              src={user.picture} 
              alt={user.given_name || 'User'} 
              width={32} 
              height={32} 
              className="rounded-full"
            />
          )}
          <span className="text-white font-medium hidden sm:block">
            {user.given_name || user.email}
          </span>
        </div>
        <LogoutLink className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">
          Logout
        </LogoutLink>
      </div>
    );
  }

  return (
    <div className="sm:flex sm:gap-4">
      <LoginLink className="block rounded-md px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700">
        Login
      </LoginLink>
      <RegisterLink className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-black transition hover:text-slate-600 sm:block">
        Register
      </RegisterLink>
    </div>
  );
}

export default AuthButton;