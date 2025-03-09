
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    try {
      const authorization = req.headers.get('Authorization')!
      const supabase = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
          {
              global: {
                headers: {
                    Authorization: authorization,
                },
              },
          }
      );

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
         return new Response(
          JSON.stringify({ error: "Unauthorized." }),
          {
            status: 401,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('wallet_address')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error("Error fetching user profile:", profileError);
        return new Response(JSON.stringify({ error: profileError.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      if (profile && profile.wallet_address) {
          // Wallet already exists
          return new Response(JSON.stringify({ address: profile.wallet_address }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
      }

      const createWalletResponse = await fetch(
        'https://www.crossmint.com/api/v1-alpha2/wallets',
        {
          method: 'POST',
          headers: {
            'X-API-KEY': Deno.env.get('CROSSMINT_API_KEY')!, 
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'x-idempotency-key': `userId:${user.id}`,
          },
          body: JSON.stringify({
            type: 'solana-mpc-wallet',
            linkedUser: `userId:${user.id}`,
          }),
        }
      )

      if (!createWalletResponse.ok) {
          const errorData = await createWalletResponse.json();
          console.error("Crossmint API Error:", errorData);
          return new Response(JSON.stringify({ error: errorData }), {
              status: createWalletResponse.status,
              headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
      }

      const walletData = await createWalletResponse.json()
      console.log("createWalletResponse: ", walletData);
      const walletAddress = walletData.address

      const { error: updateError } = await supabase
            .from('profiles')
            .update({ wallet_address: walletAddress })
            .eq('id', user.id);

      if (updateError) {
          console.error("Error storing wallet address", updateError);
          return new Response(
              JSON.stringify({ error: "Error storing wallet address." }),
              { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          )
      }

      return new Response(JSON.stringify({ address: walletAddress }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    } catch (error) {
      console.error('Unexpected error:', error)
      return new Response(
        JSON.stringify({ error: 'An unexpected error occurred.' }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      )
    }
});
