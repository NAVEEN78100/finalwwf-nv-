import fs from 'fs'
import path from 'path'

export default function PartnersReactPage() {
  const publicDir = path.join(process.cwd(), 'public', 'company', 'partners-react')
  let htmlFiles: string[] = []
  try {
    const all = fs.readdirSync(publicDir, { withFileTypes: true })
    htmlFiles = all.filter(d => d.isFile() && d.name.toLowerCase().endsWith('.html')).map(d => d.name)
  } catch (e) {}

  if (htmlFiles.length > 0) {
    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <iframe title="Partners React" src={`/company/partners-react/${htmlFiles[0]}`} style={{ width: '100%', height: '100%', border: 'none' }} />
      </div>
    )
  }

  let entries: string[] = []
  try { entries = fs.readdirSync(publicDir) } catch (e) {}

  return (
    <div style={{ padding: 20 }}>
      <h2>Partners (React import)</h2>
      <p>No HTML entry found; available files:</p>
      <ul>
        {entries.map(e => (
          <li key={e}><a href={`/company/partners-react/${e}`} target="_blank" rel="noreferrer">{e}</a></li>
        ))}
      </ul>
    </div>
  )
}
