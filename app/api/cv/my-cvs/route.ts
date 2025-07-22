import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login to view your CVs.' },
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

    // Get all CVs for this user
    const { default: SavedCV } = await import('@/models/SavedCV')
    const savedCVs = await SavedCV.find({ userId: user._id })
      .select('title template createdAt updatedAt isPublic')
      .sort({ updatedAt: -1 })

    return NextResponse.json(
      { 
        cvs: savedCVs,
        total: savedCVs.length
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching CVs:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}