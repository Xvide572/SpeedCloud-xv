"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { supabase, type Code } from "@/lib/supabase"

export default function CodeDetail() {
  const params = useParams()
  const router = useRouter()
  const [code, setCode] = useState<Code | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchCode(params.id as string)
    }
  }, [params.id])

  const fetchCode = async (id: string) => {
    try {
      const { data, error } = await supabase.from("codes").select("*").eq("id", id).single()

      if (error) throw error
      setCode(data)
    } catch (error) {
      console.error("Error fetching code:", error)
      router.push("/")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    if (!code) return

    try {
      await navigator.clipboard.writeText(code.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading code...</p>
        </div>
      </div>
    )
  }

  if (!code) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <h3 className="text-xl font-semibold mb-2">Code not found</h3>
        <p className="text-gray-400 mb-6">The code snippet you're looking for doesn't exist.</p>
        <Link href="/" className="btn-primary">
          Back to Dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
          ← Back to Dashboard
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{getLanguageIcon(code.language)}</span>
              <h1 className="text-2xl font-bold">{code.name}</h1>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>By {code.uploader_name}</span>
              <span>•</span>
              <span>{new Date(code.created_at).toLocaleDateString()}</span>
              <span>•</span>
              <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">{code.language}</span>
            </div>
          </div>

          <button
            onClick={copyToClipboard}
            className={`btn-secondary flex items-center gap-2 ${
              copied ? "bg-green-500/20 text-green-400 border-green-500/30" : ""
            }`}
          >
            {copied ? (
              <>
                <span>✅</span>
                Copied!
              </>
            ) : (
              <>
                <span>📋</span>
                Copy Code
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-400 ml-2">{code.name}</span>
          </div>
          <span className="text-xs text-gray-500">{code.language}</span>
        </div>

        <pre className="code-block m-0 rounded-none border-none">
          <code>{code.content}</code>
        </pre>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-400 mb-4">Want to share your own code?</p>
        <Link href="/upload" className="btn-primary">
          Upload Your Code
        </Link>
      </div>
    </div>
  )
}
