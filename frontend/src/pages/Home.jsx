import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <div className="hero">
        <h1 className="hero-title">The Chaos App</h1>
        <p className="hero-subtitle">
          A collection of sorting algorithms that have absolutely no business existing.
          Watch them suffer. Watch them fail. Watch them sort.
        </p>
        <button className="hero-btn" onClick={() => navigate('/algorithms')}>
          View Algorithms
        </button>
      </div>

      <div className="features">
        <div className="feature-card">
          <span className="feature-icon">🍪</span>
          <h3>Cookie Monster Sort</h3>
          <p>Scans a list of words and collects anything containing "cookie". Ignores everything else. Completely useless as a sorting algorithm.</p>
        </div>
        <div className="feature-card feature-card--soon">
          <span className="feature-icon">🎲</span>
          <h3>More chaos incoming</h3>
          <p>Bogo Sort, Stalin Sort, Sleep Sort and other crimes against computer science. Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
