import React from 'react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Props {
  params: Promise<{ userId: string }>
}

async function UserDashboard({ params }: Props) {
  const { isAuthenticated, getUser } = getKindeServerSession()
  const { userId } = await params
  
  if (!(await isAuthenticated())) {
    redirect('/api/auth/login')
  }

  const user = await getUser()
  
  // Check if the user is accessing their own dashboard
  if (user?.id !== userId) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Whiteboard Workspace
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Create and collaborate on your whiteboard ideas
                </p>
              </div>
              <Link href="/dashboard">
                <Button variant="outline">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="p-6">
            {/* Whiteboard Canvas Placeholder */}
            <div className="border-2 border-gray-200 rounded-lg h-96 bg-white relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your Whiteboard Canvas</h3>
                  <p className="text-sm text-gray-500 mb-6">This is where your whiteboard functionality will be implemented</p>
                  <div className="flex justify-center space-x-4">
                    <Button>Start Drawing</Button>
                    <Button variant="outline">Add Text</Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Toolbar */}
            <div className="mt-6 flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <h4 className="text-sm font-medium text-gray-900">Tools:</h4>
                <Button size="sm" variant="outline">Pen</Button>
                <Button size="sm" variant="outline">Eraser</Button>
                <Button size="sm" variant="outline">Text</Button>
                <Button size="sm" variant="outline">Shapes</Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">Clear</Button>
                <Button size="sm" variant="outline">Save</Button>
                <Button size="sm">Share</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard