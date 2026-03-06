import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { record } = await req.json()
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set')
    }

    // Call Resend API
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Swift Flow <onboarding@resend.dev>', // Update this to your verified domain
        to: 'hajima2708@gmail.com',
        subject: `New Booking: ${record.service_type} - ${record.full_name}`,
        html: `
          <h1>New Booking Request</h1>
          <p><strong>Name:</strong> ${record.full_name}</p>
          <p><strong>Phone:</strong> ${record.phone}</p>
          <p><strong>Email:</strong> ${record.email}</p>
          <p><strong>Service:</strong> ${record.service_type}</p>
          <p><strong>Date:</strong> ${record.preferred_date}</p>
          <p><strong>Message:</strong> ${record.message}</p>
        `,
      }),
    })

    const data = await res.json()

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
