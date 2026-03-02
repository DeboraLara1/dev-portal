import { useEffect, useRef, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Layout({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex h-screen bg-[#f8f7ff]">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <div ref={scrollRef} className="scroll-area h-full overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
