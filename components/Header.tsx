export default function Header() {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-12 pb-8 border-b border-gray-700">
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
          <span className="text-2xl">💻</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            CodePaste
          </h1>
          <p className="text-gray-400 text-sm">Share your code with the world</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-gray-400 text-sm">Created by</p>
        <a
          href="https://t.me/Xvoid10"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20 hover:bg-blue-500/20"
        >
          <span>📱</span>
          @Xvoid10
        </a>
      </div>
    </header>
  )
}
