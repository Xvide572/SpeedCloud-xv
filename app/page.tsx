"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase, type Code } from "@/lib/supabase"

export default function Dashboard() {
  const [codes, setCodes] = useState<Code[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCodes()
  }, [])

  const fetchCodes = async () => {
    try {
      const { data, error } = await supabase.from("codes").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setCodes(data || [])
    } catch (error) {
      console.error("Error fetching codes:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCodes = codes.filter(
    (code) =>
      code.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.uploader_name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getLanguageIcon = (language: string) => {
    const icons: { [key: string]: string } = {
      javascript: "🟨",
      python: "🐍",
      cpp: "⚡",
      java: "☕",
      go: "🐹",
      rust: "🦀",
      typescript: "🔷",
      html: "🌐",
      css: "🎨",
      php: "🐘",
      ruby: "💎",
      swift: "🍎",
      kotlin: "🎯",
      default: "📄",
    }
    return icons[language.toLowerCase()] || icons.default
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading code snippets...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">📊 Dashboard</h2>
        <p className="text-gray-400 mb-6">Discover and explore code snippets shared by the community</p>

        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, language, or uploader..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input pl-12"
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCodes.map((code) => (
          <Link key={code.id} href={`/code/${code.id}`}>
            <div className="code-card">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getLanguageIcon(code.language)}</span>
                  <span className="text-sm font-medium text-blue-400 bg-blue-500/20 px-2 py-1 rounded">
                    {code.language}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{new Date(code.created_at).toLocaleDateString()}</span>
              </div>

              <h3 className="font-semibold text-lg mb-2 text-white truncate">{code.name}</h3>

              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{code.content.substring(0, 100)}...</p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">By {code.uploader_name}</span>
                <span className="text-blue-400 hover:text-blue-300">View Code →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredCodes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">No code snippets found</h3>
          <p className="text-gray-400 mb-6">
            {searchTerm ? "Try adjusting your search terms" : "Be the first to share some code!"}
          </p>
          <Link href="/upload" className="btn-primary inline-block">
            Upload Code
          </Link>
        </div>
      )}
    </div>
  )
}
