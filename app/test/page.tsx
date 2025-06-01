// app/test/page.tsx
import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function TestPage() {
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  // Get some test data
  const { data: testData, error: dataError } = await supabase
    .from('profiles')
    .select('*')
    .limit(1)
    .single()

  // Get environment info
  const envInfo = {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_URL_DOMAIN: process.env.NEXT_PUBLIC_SUPABASE_URL 
      ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname 
      : 'Not set',
    isProduction: process.env.NODE_ENV === 'production',
    timestamp: new Date().toISOString()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Environment Test</h1>
        
        {/* Environment Info */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-2">
            {Object.entries(envInfo).map(([key, value]) => (
              <div key={key} className="grid grid-cols-3 gap-4">
                <span className="text-gray-600 font-medium">{key}:</span>
                <span className="col-span-2 font-mono bg-gray-100 p-1 rounded">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Auth Status */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Authentication</h2>
          {authError ? (
            <div className="text-red-600">Error: {authError.message}</div>
          ) : user ? (
            <div>
              <p>Logged in as: <strong>{user.email}</strong></p>
              <p className="text-sm text-gray-600">User ID: {user.id}</p>
            </div>
          ) : (
            <p>Not logged in</p>
          )}
        </div>

        {/* Database Test */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Database Test</h2>
          {dataError ? (
            <div className="text-red-600">
              <p>Error querying profiles table:</p>
              <pre className="mt-2 p-2 bg-red-50 text-sm overflow-auto">
                {JSON.stringify(dataError, null, 2)}
              </pre>
            </div>
          ) : testData ? (
            <div>
              <p>Sample profile data:</p>
              <pre className="mt-2 p-4 bg-gray-50 rounded text-sm overflow-auto">
                {JSON.stringify(testData, null, 2)}
              </pre>
            </div>
          ) : (
            <p>No profile data found</p>
          )}
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Page generated at: {new Date().toLocaleString()}</p>
          <p className="mt-1">This page is for testing purposes only.</p>
        </div>
      </div>
    </div>
  )
}
