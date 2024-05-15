export function getHostAddress(): string {
  if (process.env.NODE_ENV === 'production') {
    return '/api'
  }

  // const { protocol, hostname } = window.location
  return 'http://127.0.0.1:5000/api'
}
