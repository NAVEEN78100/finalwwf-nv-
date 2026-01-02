// Authentication middleware
const authenticate = (req, res, next) => {
  // Check for Authorization header first (for API calls)
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7)
    // Simple token validation - in production, use proper JWT
    if (token === 'admin_authenticated') {
      return next()
    }
  }

  // Fallback to body credentials (for direct API testing)
  const { username, password } = req.body
  if (username === 'naveen' && password === 'name_sake') {
    return next()
  }

  res.status(401).json({ ok: false, error: 'Invalid credentials' })
}

module.exports = { authenticate }