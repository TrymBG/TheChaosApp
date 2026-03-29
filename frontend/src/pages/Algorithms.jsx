import { useState } from 'react'
import './Algorithms.css'

export default function Algorithms() {
  const [input, setInput] = useState('chocolate, cookie, pizza, tomato, cookies')
  const [steps, setSteps] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function runAlgorithm() {
    setLoading(true)
    setError(null)
    setSteps([])

    try {
      const res = await fetch(`/api/algorithms/cookie-monster?input=${encodeURIComponent(input)}`)
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      const data = await res.json()
      setSteps(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') runAlgorithm()
  }

  return (
    <div className="algorithms">
      <div className="page-header">
        <h1>Algorithms</h1>
        <p>Pick your poison.</p>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h2>Cookie Monster Sort</h2>
            <p className="description">
              Scans a list of words for anything containing "cookie" or "Cookie" and collects them.
              Everything else is beneath his notice.
            </p>
          </div>
          <span className="badge">O(n) but pointless</span>
        </div>

        <div className="input-row">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. 3,8,5,2,7,4,1,6"
            spellCheck={false}
          />
          <button onClick={runAlgorithm} disabled={loading}>
            {loading ? 'Nom nom...' : 'Run'}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {steps.length > 0 && (
          <ol className="steps">
            {steps.map((step, i) => (
              <li key={i} className={stepClass(step)}>
                {step}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}

function stepClass(step) {
  if (step.includes('COOKIE')) return 'step step--cookie'
  if (step.includes('grumbles')) return 'step step--rejected'
  if (step.includes('Done')) return 'step step--done'
  return 'step'
}
