// app/api/call/route.ts
import { NextResponse } from 'next/server'

interface CallRequest {
  countryCode?: string
  phoneNumber?: string
  extension?: string
}

interface DevSuccessResponse {
  executionId: string | null
}

interface GenericSuccessResponse {
  success: true
}

interface ErrorResponse {
  error: string
}

export async function POST(request: Request) {
  const isProd = process.env.NODE_ENV === 'production'

  // 1. Parse & validate
  let body: CallRequest
  try {
    body = (await request.json()) as CallRequest
  } catch {
    return NextResponse.json<ErrorResponse>(
      { error: 'Invalid JSON' },
      { status: 400 }
    )
  }
  const { countryCode, phoneNumber, extension = '' } = body
  if (!countryCode || !phoneNumber) {
    return NextResponse.json<ErrorResponse>(
      { error: 'countryCode and phoneNumber are required.' },
      { status: 400 }
    )
  }

  // 2. Check env
  const { VAPI_API_KEY, VAPI_AGENT_ID, VAPI_PHONE_NUMBER_ID } = process.env
  if (!VAPI_API_KEY || !VAPI_AGENT_ID || !VAPI_PHONE_NUMBER_ID) {
    if (!isProd) console.error('[VAPI] Missing config in env')
    return NextResponse.json<ErrorResponse>(
      { error: 'Server misconfiguration' },
      { status: 500 }
    )
  }

  // 3. Call VAPI
  try {
    const apiRes = await fetch('https://api.vapi.ai/call', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumberId: VAPI_PHONE_NUMBER_ID,
        assistantId:   VAPI_AGENT_ID,
        customer: {
          number:    `${countryCode}${phoneNumber}`,
          extension: extension,
        },
      }),
    })

    const data = await apiRes.json()
    if (!apiRes.ok) {
      if (!isProd) console.error('[VAPI] Error response:', data)
      // In prod, don’t expose raw API errors
      const errMsg = isProd
        ? 'Failed to initiate call'
        : JSON.stringify(data)
      return NextResponse.json<ErrorResponse>(
        { error: errMsg },
        { status: apiRes.status }
      )
    }

    // 4. Success
    const executionId = data.execution_id ?? data.id ?? null

    if (isProd) {
      // only a minimal flag in production
      return NextResponse.json<GenericSuccessResponse>({ success: true })
    } else {
      // return the actual execution ID in dev
      return NextResponse.json<DevSuccessResponse>({ executionId })
    }
  } catch (err: any) {
    if (!isProd) console.error('[VAPI] Fetch failed:', err)
    return NextResponse.json<ErrorResponse>(
      { error: 'Failed to contact telephony service' },
      { status: 502 }
    )
  }
}
