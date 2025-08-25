"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function UploadCode() {
  const [name, setName] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [content, setContent] = useState("")
  const [uploaderName, setUploaderName] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const languages = [
    "javascript",
    "python",
    "cpp",
    "java",
    "go",
    "rust",
    "typescript",
    "html",
    "css",
    "php",
    "ruby",
    "swift",
    "kotlin",
    "sql",
    "bash",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("codes")
        .insert([
          {
            name: name.trim(),
            language,
            content: content.trim(),
            uploader_name: uploaderName.trim() || "Anonymous",
          },
        ])
        .select()

      if (error) throw error

      router.push(`/code/${data[0].id}`)
    } catch (error) {
      console.error("Error uploading code:", error)
      alert("Failed to upload code. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">📝 Upload Code</h2>
        <p className="text-gray-400">Share your code snippet with the community</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">📄 Code Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Hello World Function"
              className="form-input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">🔤 Programming Language *</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="form-input">
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">👤 Your Name (Optional)</label>
          <input
            type="text"
            value={uploaderName}
            onChange={(e) => setUploaderName(e.target.value)}
            placeholder="Anonymous"
            className="form-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">💻 Code Content *</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your code here..."
            className="form-input form-textarea"
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading || !name.trim() || !content.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                Uploading...
              </span>
            ) : (
              "🚀 Upload Code"
            )}
          </button>

          <button type="button" onClick={() => router.push("/")} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
