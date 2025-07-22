import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import connectDB from '@/lib/mongodb'
import SavedCV from '@/models/SavedCV'
import User from '@/models/User'

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    
    if (!token || !token.email) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login to save CV.' },
        { status: 401 }
      )
    }

    await connectDB()
    
    // Find user by email
    const user = await User.findOne({ email: token.email })
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { title, template, cvData, isPublic = false } = body

    if (!template || !cvData) {
      return NextResponse.json(
        { error: 'Template and CV data are required' },
        { status: 400 }
      )
    }

    // Create new saved CV
    const savedCV = new SavedCV({
      userId: user._id,
      title: title || 'Untitled CV',
      template,
      cvData,
      isPublic,
    })

    await savedCV.save()

    return NextResponse.json(
      { 
        message: 'CV saved successfully',
        cvId: savedCV._id,
        title: savedCV.title
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving CV:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}