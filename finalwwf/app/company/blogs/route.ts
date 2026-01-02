import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const htmlPath = path.join(process.cwd(), 'public', 'company', 'blogs', 'index.html')
    const html = await fs.promises.readFile(htmlPath, 'utf8')
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    })
  } catch (err) {
    return new NextResponse('Not found', { status: 404 })
  }
}
