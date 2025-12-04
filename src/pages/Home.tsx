import Calculator from '../components/Calculator'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">54</h1>
        <p className="text-slate-400">Your project is ready! Start editing in the chat.</p>
        <p className="text-slate-500 mt-4 text-sm">
          Note: Use <code className="bg-slate-700 px-2 py-1 rounded">Link</code> from react-router-dom for navigation, not <code className="bg-slate-700 px-2 py-1 rounded">a</code> tags.
        </p>
        <div className="mt-6">
          <Calculator />
        </div>
      </div>
    </div>
  )
}
