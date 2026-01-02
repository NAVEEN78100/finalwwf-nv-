import { redirect } from 'next/navigation'

export default function Page() {
  // Server-side redirect to the static CRA index so scripts run in top-level context
  redirect('/company/blogs/index.html')
}
