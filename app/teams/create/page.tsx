"use client"
import React, { useState } from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

function CreateTeam() {
  const [teamName, setTeamName] = useState('')
  const { user } = useKindeBrowserClient()
  const createTeam = useMutation(api.teams.createTeam)
  const router = useRouter()

  const handleCreateTeam = async () => {
    if (teamName && user?.email) {
      await createTeam({
        teamName,
        createdBy: user.email
      })
      router.push('/dashboard')
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4'>
      <Image src='/logo.svg' alt='Logo' width={100} height={100} className='mb-8' />
      <div className='max-w-md w-full'>
        <h1 className='text-3xl font-bold text-center mb-2'>What should we call your team?</h1>
        <p className='text-gray-500 text-center mb-8'>You can always change this later from settings.</p>
        
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Team Name</label>
            <input 
              type='text' 
              placeholder='e.g. Acme Corp' 
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all'
              onChange={(e) => setTeamName(e.target.value)}
              value={teamName}
            />
          </div>
          
          <Button 
            className='w-full py-6 text-lg font-semibold' 
            disabled={!teamName || teamName.length < 2}
            onClick={handleCreateTeam}
          >
            Create Team
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateTeam
