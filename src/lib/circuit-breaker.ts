interface CircuitState {
  failures: number
  lastFailure: number
  state: 'closed' | 'open' | 'half-open'
}

const circuits = new Map<string, CircuitState>()

const THRESHOLD = 5
const RESET_TIMEOUT_MS = 60_000  // 1 minute
const HALF_OPEN_TIMEOUT_MS = 30_000

export class CircuitBreakerOpenError extends Error {
  constructor(name: string) {
    super(`Circuit breaker "${name}" is open`)
    this.name = 'CircuitBreakerOpenError'
  }
}

export function callWithBreaker<T>(
  name: string,
  fn: () => Promise<T>,
): Promise<T> {
  const now = Date.now()
  let circuit = circuits.get(name)

  if (!circuit) {
    circuit = { failures: 0, lastFailure: 0, state: 'closed' }
    circuits.set(name, circuit)
  }

  if (circuit.state === 'open') {
    if (now - circuit.lastFailure > RESET_TIMEOUT_MS) {
      circuit.state = 'half-open'
    } else {
      return Promise.reject(new CircuitBreakerOpenError(name))
    }
  }

  return fn().then(
    (result) => {
      if (circuit!.state === 'half-open') {
        circuit!.state = 'closed'
        circuit!.failures = 0
      }
      return result
    },
    (err) => {
      circuit!.failures++
      circuit!.lastFailure = now

      if (
        circuit!.failures >= THRESHOLD ||
        (circuit!.state === 'half-open')
      ) {
        circuit!.state = 'open'
      }

      throw err
    },
  )
}

export function resetCircuit(name: string): void {
  circuits.delete(name)
}
