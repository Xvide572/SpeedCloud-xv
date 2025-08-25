export default function CreatorPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-blue-500/30">
          <span className="text-5xl">👨‍💻</span>
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Xvoid
        </h1>
        <p className="text-xl text-gray-400 mb-8">Full Stack Developer & Creator of CodePaste</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🚀</span>
            <h3 className="text-xl font-semibold">About CodePaste</h3>
          </div>
          <p className="text-gray-400 leading-relaxed">
            CodePaste is a modern, clean, and user-friendly platform for sharing code snippets. Built with Next.js,
            Supabase, and a beautiful dark theme, it provides developers with an elegant way to share and discover code.
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">💡</span>
            <h3 className="text-xl font-semibold">Features</h3>
          </div>
          <ul className="text-gray-400 space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Syntax highlighting for multiple languages
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Real-time search and filtering
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Clean, modern interface
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Admin panel for management
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
        <div className="flex items-center gap-3 justify-center mb-6">
          <span className="text-2xl">📱</span>
          <h3 className="text-xl font-semibold">Get in Touch</h3>
        </div>
        <p className="text-gray-400 mb-6">
          Have questions, suggestions, or want to collaborate? Feel free to reach out!
        </p>
        <a
          href="https://t.me/Xvoid10"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1"
        >
          <span className="text-xl">📱</span>
          Contact on Telegram
          <span className="text-sm opacity-80">@Xvoid10</span>
        </a>
      </div>

      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-xl p-8">
          <h3 className="text-xl font-semibold mb-4">🌟 Support the Project</h3>
          <p className="text-gray-400 mb-6">
            If you find CodePaste useful, consider sharing it with other developers or contributing to its development!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-secondary">⭐ Star on GitHub</button>
            <button className="btn-secondary">🐛 Report Issues</button>
            <button className="btn-secondary">💡 Suggest Features</button>
          </div>
        </div>
      </div>
    </div>
  )
}
