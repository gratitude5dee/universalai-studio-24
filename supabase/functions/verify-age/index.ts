
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method === 'POST') {
    try {
      const body = await req.json();
      const { proof, publicSignals } = body;

      if (!proof || !publicSignals) {
        return new Response(
          JSON.stringify({
            status: 'error',
            message: 'Proof and publicSignals are required',
          }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Since we can't use @selfxyz/core directly in Deno,
      // we need to implement a simplified verification approach
      
      // Extract user ID from the public signals (simplified)
      console.log("Verifying with public signals:", publicSignals);
      
      // This is a simplified mock verification
      // In production, you would use a Deno-compatible verification library
      // or make an HTTP request to a verification service
      
      const mockVerificationResult = {
        isValid: true,
        credentialSubject: {
          minimumAge: 18,
          userId: typeof publicSignals === 'string' ? publicSignals : 
                  Array.isArray(publicSignals) && publicSignals.length > 0 ? 
                  publicSignals[0] : 'unknown-user'
        }
      };
      
      if (mockVerificationResult.isValid) {
        // Return successful verification response
        return new Response(
          JSON.stringify({
            status: 'success',
            result: true,
            credentialSubject: mockVerificationResult.credentialSubject
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      } else {
        // Return failed verification response
        return new Response(
          JSON.stringify({
            status: 'error',
            result: false,
            message: 'Verification failed',
            details: 'Mock verification failed'
          }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    } catch (error) {
      console.error('Error verifying proof:', error);
      return new Response(
        JSON.stringify({
          status: 'error',
          result: false,
          message: error instanceof Error ? error.message : 'Unknown error'
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  } else {
    return new Response(
      JSON.stringify({ message: 'Method not allowed' }),
      {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
