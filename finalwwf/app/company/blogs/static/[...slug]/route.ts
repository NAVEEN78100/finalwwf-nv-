import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

const mime: Record<string, string> = {
  '.js': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.map': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=UTF-8',
  '.txt': 'text/plain; charset=UTF-8'
}

export async function GET(_request: Request, { params }: { params: { slug?: string[] } }) {
  try {
    const slug = params?.slug ? params.slug.join('/') : ''
    const filePath = path.join(process.cwd(), 'public', 'company', 'blogs', 'static', slug)
    if (!filePath.startsWith(path.join(process.cwd(), 'public', 'company', 'blogs', 'static'))) {
      return new NextResponse('Forbidden', { status: 403 })
    }
    const ext = path.extname(filePath).toLowerCase()
    const contentType = mime[ext] || 'application/octet-stream'
    const buffer = await fs.promises.readFile(filePath)
    return new NextResponse(buffer, {
      status: 200,
      headers: { 'Content-Type': contentType }
    })
  } catch (err) {
    return new NextResponse('Not found', { status: 404 })
  }
}
