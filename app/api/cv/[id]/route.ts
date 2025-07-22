import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import SavedCV from '@/models/SavedCV'
import User from '@/models/User'
import mongoose from 'mongoose'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession({ req: request, res: NextResponse } as any, authOptions)
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login to view CV.' },
        { status: 401 }
      )
    }

    await connectDB()
    
    const { id } = params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid CV ID' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get CV by ID and ensure it belongs to the user
    const savedCV = await SavedCV.findOne({ _id: id, userId: user._id })
    
    if (!savedCV) {
      return NextResponse.json(
        { error: 'CV not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { cv: savedCV },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching CV:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession({ req: request, res: NextResponse } as any, authOptions)
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login to update CV.' },
        { status: 401 }
      )
    }

    await connectDB()
    
    const { id } = params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid CV ID' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { title, template, cvData, isPublic } = body

    // Update CV
    const updatedCV = await SavedCV.findOneAndUpdate(
      { _id: id, userId: user._id },
      {
        ...(title && { title }),
        ...(template && { template }),
        ...(cvData && { cvData }),
        ...(typeof isPublic === 'boolean' && { isPublic }),
        updatedAt: new Date(),
      },
      { new: true }
    )

    if (!updatedCV) {
      return NextResponse.json(
        { error: 'CV not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { 
        message: 'CV updated successfully',
        cv: updatedCV
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating CV:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession({ req: request, res: NextResponse } as any, authOptions)
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login to delete CV.' },
        { status: 401 }
      )
    }

    await connectDB()
    
    const { id } = params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid CV ID' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Delete CV
    const deletedCV = await SavedCV.findOneAndDelete({ _id: id, userId: user._id })

    if (!deletedCV) {
      return NextResponse.json(
        { error: 'CV not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'CV deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting CV:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}