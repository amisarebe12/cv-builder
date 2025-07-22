import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login to save CV.' },
        { status: 401 }
      )
    }

    const { default: connectDB } = await import('@/lib/mongodb')
    await connectDB()
    
    // Find user by email
    const { default: User } = await import('@/models/User')
    const user = await User.findOne({ email: session.user.email })
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
    const { default: SavedCV } = await import('@/models/SavedCV')
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