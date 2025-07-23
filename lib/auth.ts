import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email và mật khẩu là bắt buộc')
        }

        try {
          const { default: connectDB } = await import('@/lib/mongodb')
          const { default: User } = await import('@/models/User')
          
          await connectDB()
          const user = await User.findOne({ email: credentials.email })

          if (!user || !user.password) {
            throw new Error('Email hoặc mật khẩu không chính xác')
          }

          // Check if account is locked
          if (user.isLocked) {
            const lockTime = Math.ceil((user.lockUntil - Date.now()) / (1000 * 60))
            throw new Error(`Tài khoản đã bị khóa. Thử lại sau ${lockTime} phút.`)
          }

          // Check if email is verified (only for credentials provider)
          if (user.provider === 'credentials' && !user.emailVerified) {
            throw new Error('Vui lòng xác thực email trước khi đăng nhập')
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

          if (!isPasswordValid) {
            // Increment login attempts
            await user.incLoginAttempts()
            throw new Error('Email hoặc mật khẩu không chính xác')
          }

          // Reset login attempts on successful login
          await user.resetLoginAttempts()

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            emailVerified: user.emailVerified
          }
        } catch (error) {
          console.error('Auth error:', error)
          throw error
        }
      }
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    ] : []),
    ...(process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET ? [
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      })
    ] : []),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Handle both www and non-www domains for mobile compatibility
      const domainName = process.env.DOMAIN_NAME || 'cleanspark.site'
      const allowedDomains = [
        `https://${domainName}`,
        `https://www.${domainName}`
      ]
      
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      
      // Check if URL is from allowed domains
      try {
        const urlObj = new URL(url)
        if (allowedDomains.some(domain => url.startsWith(domain))) {
          return url
        }
      } catch (error) {
        console.error('Invalid URL in redirect:', url)
      }
      
      // Allows callback URLs on the same origin
      try {
        if (new URL(url).origin === baseUrl) return url
      } catch (error) {
        console.error('Invalid URL comparison:', url, baseUrl)
      }
      
      return baseUrl
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' || account?.provider === 'facebook') {
        try {
          const { default: connectDB } = await import('@/lib/mongodb')
          const { default: User } = await import('@/models/User')
          
          await connectDB()
          const existingUser = await User.findOne({ email: user.email })
          
          if (!existingUser) {
            await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              provider: account.provider,
              providerId: account.providerAccountId,
            })
          }
          return true
        } catch (error) {
          console.error('Error saving OAuth user:', error)
          return false
        }
      }
      return true
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
}