"use client"
import React, { useEffect, useRef } from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

function Dashboard() {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient()
  
  // useQuery returns undefined while loading, null if not found, and the object if found
  const userData = useQuery(api.users.getUser, user?.email ? { email: user.email } : "skip")
  const createUser = useMutation(api.users.createUser)
  const hasAttemptedUserCreation = useRef(false)

  useEffect(() => {
    // Only attempt creation when we know the user is authenticated 
    // AND we've confirmed they don't exist in Convex (userData === null)
    if (!isLoading && isAuthenticated && user?.email && userData === null && !hasAttemptedUserCreation.current) {
      hasAttemptedUserCreation.current = true
      
      createUser({
        name: user.given_name || user.family_name || 'User',
        email: user.email || '',
        image: user.picture || '',
      })
        .then((resp) => console.log('User created in Convex:', resp))
        .catch((error) => {
          console.error('Error creating user:', error)
          hasAttemptedUserCreation.current = false // reset for retry
        })
    }
  }, [isLoading, isAuthenticated, user, userData, createUser])

  // Redirecting is handled by middleware.ts, so we only need to show a loading state here.
  if (isLoading || userData === undefined) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.given_name || user?.email}!
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Here's your dashboard with all your whiteboards and projects.
            </p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Create New Whiteboard Card */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors">
                <div className="w-12 h-12 mx-auto mb-4 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Create New Whiteboard</h3>
                <p className="text-xs text-gray-500 mb-4">Start a new collaborative whiteboard session</p>
                <Button className="w-full">
                  <Link href={`/dashboard/${user?.id}`}>Create Whiteboard</Link>
                </Button>
              </div>
              
              {/* Sample Whiteboard Cards */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Project Brainstorm</h3>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Team collaboration board for new project ideas</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                  <Button variant="outline" size="sm">
                    Open
                  </Button>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Design Mockups</h3>
                  <span className="text-xs text-gray-500">1 week ago</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">UI/UX design collaboration board</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Archived</span>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard