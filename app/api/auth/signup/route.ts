import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    console.log('Signup API called');
    const { name, email, password } = await request.json();
    console.log('Request data:', { name, email, password: '***' });

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ thông tin' },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email không hợp lệ' },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }
      );
    }

    console.log('Connecting to database...');
    const { default: connectDB } = await import('@/lib/mongodb');
    await connectDB();
    console.log('Database connected successfully');

    // Check if user already exists
    console.log('Checking for existing user with email:', email);
    const { default: User } = await import('@/models/User');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email đã được sử dụng' },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }
      );
    }

    // Create temporary user instance for password validation
    const tempUser = new User();
    const passwordValidation = tempUser.validatePasswordStrength(password);
    
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { 
          error: 'Mật khẩu không đủ mạnh',
          details: passwordValidation.errors,
          strength: passwordValidation.strength
        },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user (not verified initially)
    console.log('Creating new user...');
    const user = new User({
      name,
      email,
      password: hashedPassword,
      provider: 'credentials',
      emailVerified: false,
      passwordHistory: [{
        password: hashedPassword,
        createdAt: new Date()
      }]
    });

    await user.save();
    console.log('User created successfully with ID:', user._id);

    // Send verification email
    try {
      // Get the base URL from the request headers
      const protocol = request.headers.get('x-forwarded-proto') || 'http';
      const host = request.headers.get('host') || 'localhost:3000';
      const baseUrl = `${protocol}://${host}`;
      
      const verificationResponse = await fetch(`${baseUrl}/api/auth/send-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          userId: user._id.toString(),
          name
        })
      });

      if (!verificationResponse.ok) {
        console.error('Failed to send verification email');
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError);
    }

    return NextResponse.json(
      { 
        message: 'Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.',
        userId: user._id.toString(),
        emailSent: true,
        passwordStrength: passwordValidation.strength
      },
      { 
        status: 201,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi đăng ký' },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
    );
  }
}