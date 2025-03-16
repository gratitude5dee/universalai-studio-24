
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { SelfBackendVerifier, getUserIdentifier } from '@selfxyz/core';

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

      // Extract user ID from the proof
      const userId = await getUserIdentifier(publicSignals);
      console.log("Extracted userId:", userId);

      // Initialize and configure the verifier
      const selfBackendVerifier = new SelfBackendVerifier(
        'https://forno.celo.org', // Celo RPC url
        'wzrd-age-verification' // Scope that identifies your app
      );
      
      // Configure verification options - verifying minimum age of 18
      selfBackendVerifier.setMinimumAge(18);

      // Verify the proof
      const result = await selfBackendVerifier.verify(proof, publicSignals);
      
      if (result.isValid) {
        // Store verification result in your database here if needed
        
        // Return successful verification response
        return new Response(
          JSON.stringify({
            status: 'success',
            result: true,
            credentialSubject: result.credentialSubject
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
            details: result.isValidDetails
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
