"use client"

import { useState, useEffect } from "react"
import { supabase, type Code } from "@/lib/supabase"

export default function AdminPage() {
  const [codes, setCodes] = useState<Code[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

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

  const deleteCode = async (id: string) => {
    if (!confirm("Are you sure you want to delete this code snippet?")) return

    setDeleting(id)
    try {
      const { error } = await supabase.from("codes").delete().eq("id", id)

      if (error) throw error

      setCodes(codes.filter((code) => code.id !== id))
    } catch (error) {
      console.error("Error deleting code:", error)
      alert("Failed to delete code. Please try again.")
    } finally {
      setDeleting(null)
    }
  }

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

  // Get unique uploaders
  const uniqueUploaders = Array.from(new Set(codes.map((code) => code.uploader_name)))
  const totalCodes = codes.length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading admin data...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">⚙️ Admin Panel</h2>
        <p className="text-gray-400 mb-6">Manage code snippets and users</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📊</span>
              <h3 className="font-semibold">Total Codes</h3>
            </div>
            <p className="text-3xl font-bold text-blue-400">{totalCodes}</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">👥</span>
              <h3 className="font-semibold">Active Users</h3>
            </div>
            <p className="text-3xl font-bold text-green-400">{uniqueUploaders.length}</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🔥</span>
              <h3 className="font-semibold">Most Active</h3>
            </div>
            <p className="text-lg font-bold text-orange-400">
              {codes.reduce(
                (acc, code) => {
                  acc[code.uploader_name] = (acc[code.uploader_name] || 0) + 1
                  return acc
                },
                {} as Record<string, number>,
              )}
              {Object.entries(
                codes.reduce(
                  (acc, code) => {
                    acc[code.uploader_name] = (acc[code.uploader_name] || 0) + 1
                    return acc
                  },
                  {} as Record<string, number>,
                ),
              ).sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Code Management */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold">Code Snippets Management</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Language
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Uploader
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {codes.map((code) => (
                <tr key={code.id} className="hover:bg-slate-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getLanguageIcon(code.language)}</span>
                      <div>
                        <div className="font-medium text-white">{code.name}</div>
                        <div className="text-sm text-gray-400 truncate max-w-xs">
                          {code.content.substring(0, 50)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm">{code.language}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{code.uploader_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{new Date(code.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <a
                        href={`/code/${code.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-xs"
                      >
                        View
                      </a>
                      <button
                        onClick={() => deleteCode(code.id)}
                        disabled={deleting === code.id}
                        className="btn-danger text-xs disabled:opacity-50"
                      >
                        {deleting === code.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {codes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">No code snippets yet</h3>
          <p className="text-gray-400">Code snippets will appear here once users start uploading.</p>
        </div>
      )}
    </div>
  )
}
