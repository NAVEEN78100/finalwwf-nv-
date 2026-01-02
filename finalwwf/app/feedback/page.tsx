'use client'

export default function FeedbackPage() {
  return (
    <iframe
      src="/feedback/index.html"
      title="Feedback App"
      style={{ 
        width: '100%', 
        height: '100vh', 
        border: 'none',
        display: 'block'
      }}
      sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
    />
  )
}
