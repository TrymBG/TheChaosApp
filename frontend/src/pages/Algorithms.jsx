import { useState, useEffect } from 'react'
import './Algorithms.css'

const ALGORITHMS = [
  {
    id: 'cookie-monster',
    name: 'Cookie Monster Sort',
    icon: '🍪',
    description: 'Scans a list of words for anything containing "cookie" and collects them. Everything else is beneath his notice.',
    badge: 'O(n) but pointless',
  },
  {
    id: 'bank',
    name: 'South Park Bank',
    icon: '🏦',
    description: 'Deposit your money. Watch it disappear. Get asked to leave.',
    badge: 'O(your savings)',
  },
]

export default function Algorithms() {
  const [selected, setSelected] = useState(null)

  const [input, setInput] = useState('chocolate, cookie, pizza, tomato, cookies')
  const [steps, setSteps] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [bankAmount, setBankAmount] = useState('1000')
  const [bankSteps, setBankSteps] = useState([])
  const [visibleBankSteps, setVisibleBankSteps] = useState([])
  const [bankLoading, setBankLoading] = useState(false)
  const [bankError, setBankError] = useState(null)

  useEffect(() => {
    if (bankSteps.length === 0) {
      setVisibleBankSteps([])
      return
    }
    bankSteps.forEach((step, i) => {
      setTimeout(() => {
        setVisibleBankSteps(prev => [...prev, step])
      }, i * 1000)
    })
  }, [bankSteps])

  async function runCookieMonster() {
    setLoading(true)
    setError(null)
    setSteps([])

    try {
      const res = await fetch(`/api/algorithms/cookie-monster?input=${encodeURIComponent(input)}`)
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      setSteps(await res.json())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function runBankSort() {
    setBankLoading(true)
    setBankError(null)
    setBankSteps([])

    try {
      const res = await fetch(`/api/algorithms/bank-sort?amount=${bankAmount}`)
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      setBankSteps(await res.json())
    } catch (e) {
      setBankError(e.message)
    } finally {
      setBankLoading(false)
    }
  }

  function handleSelect(id) {
    setSelected(id)
    setSteps([])
    setBankSteps([])
    setError(null)
    setBankError(null)
  }

  return (
    <div className="algorithms">
      <div className="page-header">
        <h1>Algorithms</h1>
        <p>Pick your poison.</p>
      </div>

      <div className="algorithm-grid">
        {ALGORITHMS.map(algo => (
          <button
            key={algo.id}
            className={`algo-card ${selected === algo.id ? 'algo-card--active' : ''}`}
            onClick={() => handleSelect(algo.id)}
          >
            <span className="algo-icon">{algo.icon}</span>
            <div>
              <p className="algo-name">{algo.name}</p>
              <p className="algo-desc">{algo.description}</p>
            </div>
            <span className="badge">{algo.badge}</span>
          </button>
        ))}
      </div>

      {selected === 'cookie-monster' && (
        <div className="runner">
          <div className="input-row">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && runCookieMonster()}
              placeholder="e.g. chocolate,cookie,pizza,broccoli"
              spellCheck={false}
            />
            <button onClick={runCookieMonster} disabled={loading}>
              {loading ? 'Nom nom...' : 'Run'}
            </button>
          </div>

          {error && <p className="error">{error}</p>}

          {steps.length > 0 && (
            <ol className="steps">
              {steps.map((step, i) => (
                <li key={i} className={cookieStepClass(step)}>{step}</li>
              ))}
            </ol>
          )}
        </div>
      )}

      {selected === 'bank' && (
        <div className="runner">
          <div className="input-row">
            <input
              type="number"
              value={bankAmount}
              onChange={e => setBankAmount(e.target.value)}
              placeholder="e.g. 1000"
            />
            <button onClick={runBankSort} disabled={bankLoading}>
              {bankLoading ? 'Investing...' : 'Deposit'}
            </button>
          </div>

          {bankError && <p className="error">{bankError}</p>}

          {visibleBankSteps.length > 0 && (
            <ol className="steps">
              {visibleBankSteps.map((step, i) =>
                step.includes('Poof') ? (
                  <li key={i}>
                    <img src="/images/SouthParkBank.png" alt="And it's gone" className="bank-image" />
                  </li>
                ) : (
                  <li key={i} className={bankStepClass(step)}>{step}</li>
                )
              )}
            </ol>
          )}
        </div>
      )}
    </div>
  )
}

function cookieStepClass(step) {
  if (step.includes('COOKIE')) return 'step step--cookie'
  if (step.includes('grumbles')) return 'step step--rejected'
  if (step.includes('Done')) return 'step step--done'
  return 'step'
}

function bankStepClass(step) {
  if (step.includes('sorry')) return 'step step--rejected'
  if (step.includes('Final balance')) return 'step step--done'
  return 'step'
}
