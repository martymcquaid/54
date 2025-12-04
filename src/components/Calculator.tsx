import React, { useEffect, useMemo, useState } from 'react'

type Operator = '+' | '-' | '*' | '/'

const compute = (a: number, b: number, op: Operator): number => {
  switch (op) {
    case '+': return a + b
    case '-': return a - b
    case '*': return a * b
    case '/': return b === 0 ? NaN : a / b
    default: return b
  }
}

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0')
  const [prev, setPrev] = useState<number | null>(null)
  const [operator, setOperator] = useState<Operator | null>(null)
  const [overwrite, setOverwrite] = useState<boolean>(true)

  const inputDigit = (d: string) => {
    if (overwrite) {
      setDisplay(d)
      setOverwrite(false)
    } else {
      // Avoid leading zeros
      if (display === '0' && d !== '.') {
        setDisplay(d)
      } else {
        setDisplay(display + d)
      }
    }
  }

  const inputDot = () => {
    if (overwrite) {
      setDisplay('0.')
      setOverwrite(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const clearAll = () => {
    setDisplay('0')
    setPrev(null)
    setOperator(null)
    setOverwrite(true)
  }

  const backspace = () => {
    if (overwrite) return
    if (display.length <= 1) {
      setDisplay('0')
      setOverwrite(true)
    } else {
      setDisplay(display.slice(0, -1))
    }
  }

  const setOp = (op: Operator) => {
    const current = parseFloat(display)
    if (prev !== null && operator !== null && !overwrite) {
      // Chain calculation
      const result = compute(prev, current, operator)
      setPrev(result)
      setDisplay(String(result))
      setOperator(op)
      setOverwrite(true)
    } else {
      setPrev(current)
      setOperator(op)
      setOverwrite(true)
    }
  }

  const equals = () => {
    if (operator && prev !== null) {
      const current = parseFloat(display)
      const result = compute(prev, current, operator)
      setDisplay(String(result))
      setPrev(null)
      setOperator(null)
      setOverwrite(true)
    }
  }

  // Keyboard support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key
      if ((/^[0-9]$/.test(key))) {
        inputDigit(key)
        e.preventDefault()
      } else if (key === '.') {
        inputDot()
        e.preventDefault()
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        setOp(key as Operator)
        e.preventDefault()
      } else if (key === 'Enter' || key === '=') {
        equals()
        e.preventDefault()
      } else if (key === 'Backspace') {
        backspace()
        e.preventDefault()
      } else if (key.toLowerCase() === 'c') {
        clearAll()
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [display, prev, operator, overwrite])

  const showPrev = useMemo(() => (prev !== null && operator ? `${prev} ${operator}` : ''), [prev, operator])

  return (
    <div className="bg-slate-900/70 rounded-xl p-4 shadow-lg w-full max-w-md mx-auto">
      <div className="mb-2 text-right min-h-[56px] text-2xl font-semibold text-white bg-slate-800 rounded-md p-3">
        <div className="text-sm text-slate-300 mb-1">{showPrev}</div>
        <div className="text-2xl">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: '7', onClick: () => inputDigit('7') },
          { label: '8', onClick: () => inputDigit('8') },
          { label: '9', onClick: () => inputDigit('9') },
          { label: '/', onClick: () => setOp('/') },
          { label: '4', onClick: () => inputDigit('4') },
          { label: '5', onClick: () => inputDigit('5') },
          { label: '6', onClick: () => inputDigit('6') },
          { label: '*', onClick: () => setOp('*') },
          { label: '1', onClick: () => inputDigit('1') },
          { label: '2', onClick: () => inputDigit('2') },
          { label: '3', onClick: () => inputDigit('3') },
          { label: '-', onClick: () => setOp('-') },
          { label: '0', onClick: () => inputDigit('0') },
          { label: '.', onClick: () => inputDot() },
          { label: '=', onClick: equals },
          { label: '+', onClick: () => setOp('+') },
        { label: '⌫', onClick: backspace },
        { label: 'C', onClick: clearAll },
        { label: '', onClick: () => {} },
        ].map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.onClick}
            className={`h-12 rounded-md ${btn.label ? 'bg-slate-700 text-white hover:bg-slate-600' : ''}`}
            aria-label={`btn-${btn.label}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Calculator
