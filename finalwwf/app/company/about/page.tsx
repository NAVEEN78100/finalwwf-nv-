import React from 'react'

export default function AboutIframe() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        title="About"
        src="/company/wwf-about/index.html"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  )
}
