"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Dashboard", icon: "📊" },
    { href: "/upload", label: "Upload Code", icon: "📝" },
    { href: "/admin", label: "Admin", icon: "⚙️" },
    { href: "/creator", label: "Creator", icon: "👨‍💻" },
  ]

  return (
    <nav className="flex flex-wrap gap-4 mb-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`nav-link flex items-center gap-2 ${pathname === item.href ? "active" : ""}`}
        >
          <span>{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
