import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

// IMPORTANT: For navigation, always use <Link> from react-router-dom, not <a> tags
// This ensures client-side routing works correctly with the preview URL base path
// Example: <Link to="/about">About</Link> instead of <a href="/about">About</a>

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
