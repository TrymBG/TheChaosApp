import { useState, useEffect } from 'react'
import './Algorithms.css'

export default function Algorithms() {
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

  async function runBankSort() {
    setBankLoading(true)
    setBankError(null)
    setBankSteps([])

    try {
      const res = await fetch(`/api/algorithms/bank-sort?amount=${bankAmount}`)
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      const data = await res.json()
      setBankSteps(data)
    } catch (e) {
      setBankError(e.message)
    } finally {
      setBankLoading(false)
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
            placeholder="e.g. chocolate,cookie,pizza,broccoli"
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

      <div className="card">
        <div className="card-header">
          <div>
            <h2>South Park Bank</h2>
            <p className="description">
              Deposit your money. Watch it disappear. Get asked to leave.
            </p>
          </div>
          <span className="badge">O(your savings)</span>
        </div>

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
                  <img
                    src="/images/SouthParkBank.png"
                    alt="And it's gone"
                    className="bank-image"
                  />
                </li>
              ) : (
                <li key={i} className={bankStepClass(step)}>
                  {step}
                </li>
              )
            )}
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

function bankStepClass(step) {
  if (step.includes('Poof') || step.includes("it's gone")) return 'step step--gone'
  if (step.includes('sorry')) return 'step step--rejected'
  if (step.includes('Final balance')) return 'step step--done'
  return 'step'
}
