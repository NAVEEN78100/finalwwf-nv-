import fs from 'fs'
import path from 'path'

export default function GrievancePage() {
  const publicDir = path.join(process.cwd(), 'public', 'company', 'exported-assets')
  let hasIndex = false
  try {
    hasIndex = fs.existsSync(path.join(publicDir, 'index.html'))
  } catch (e) {
    hasIndex = false
  }

  if (hasIndex) {
    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <iframe title="Grievance" src={`/company/exported-assets/index.html`} style={{ width: '100%', height: '100%', border: 'none' }} />
      </div>
    )
  }

  // fallback: show guidance and list available files under company/exported-assets
  let entries: string[] = []
  try {
    const items = fs.readdirSync(path.join(process.cwd(), 'company', 'exported-assets'), { withFileTypes: true })
    entries = items.map(i => i.name)
  } catch (e) {
    entries = []
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Grievance app (exported-assets)</h2>
      <p>
        No built/static site found at <code>/public/company/exported-assets/index.html</code>.
        To run the grievance app when you click Company → Grievance, place the static build
        (the files from the app's <code>public/</code> folder or a CRA build) into
        <code>public/company/exported-assets/</code> (index.html, css, js, images).
      </p>

      <h3>Files I can see under <code>company/exported-assets</code>:</h3>
      {entries.length === 0 ? <p><i>(no files detected)</i></p> : (
        <ul>
          {entries.map(e => (
            <li key={e}><a href={`/company/exported-assets/${e}`} target="_blank" rel="noreferrer">{e}</a></li>
          ))}
        </ul>
      )}

      <p>If you'd like, I can copy a built export into <code>public/company/exported-assets</code> or create a small wrapper that runs the app inline.</p>
    </div>
  )
}
