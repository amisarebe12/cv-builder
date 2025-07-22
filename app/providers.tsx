'use client'

import { SessionProvider } from 'next-auth/react'
import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider 
      refetchInterval={5 * 60} // Refetch session every 5 minutes
      refetchOnWindowFocus={true} // Refetch when window gains focus
    >
      <ConfigProvider 
        locale={viVN}
        theme={{
          token: {
            colorPrimary: '#2563eb',
            borderRadius: 8,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          },
          components: {
            Button: {
              borderRadius: 8,
              controlHeight: 40,
            },
            Input: {
              borderRadius: 8,
              controlHeight: 40,
            },
            Card: {
              borderRadius: 12,
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </SessionProvider>
  )
}