
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { PublicKey, SystemProgram, TransactionMessage, VersionedTransaction } from 'https://esm.sh/@solana/web3.js'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders })
    }

    try {
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
            {
                global: {
                    headers: {
                        Authorization: req.headers.get('Authorization')!,
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

        // Get recipient and amount from the request.
        const { recipient, amount, symbol } = await req.json();
        console.log(recipient, amount, symbol)
        if(!recipient || !amount || !symbol || symbol !== "SOL"){
            console.error("recipient, amount or symbol not provided or invalid")
            return new Response(
              JSON.stringify({ error: "recipient, amount and symbol are required. Symbol must be SOL" }),
              { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('wallet_address')
        .eq('id', user.id)
        .single();

        if (profileError || !profile?.wallet_address) {
            console.error("Error fetching wallet", profileError);
            return new Response(
            JSON.stringify({ error: "Could not get wallet for user" }),
            {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" }
            }
            )
        }

        let senderAddress = profile.wallet_address;
        const wallet = new PublicKey(senderAddress);
        let amountInLamports = Math.floor(parseFloat(amount) * 1000000000);

        // Fetch a recent blockhash from the Solana cluster
        const blockhashResponse = await fetch('https://api.mainnet-beta.solana.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getLatestBlockhash',
            }),
        });

        const blockhashJson = await blockhashResponse.json();
        const blockhash = blockhashJson.result.value.blockhash;

        // Create transfer instruction
        const instruction = SystemProgram.transfer({
            fromPubkey: new PublicKey(senderAddress),
            toPubkey: new PublicKey(recipient),
            lamports: amountInLamports,
        });

        const message = new TransactionMessage({
            instructions: [instruction],
            recentBlockhash: blockhash,
            payerKey: new PublicKey(senderAddress),
        }).compileToV0Message();

        const transaction = new VersionedTransaction(message);

        // Serialize and encode transaction
        const serializedTransaction = transaction.serialize();
        const transactionBase64 = Buffer.from(serializedTransaction).toString('base64');
        
        return new Response(JSON.stringify({ transaction: transactionBase64 }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    } catch (error) {
      console.error('Error processing SOL transfer:', error);
      return new Response(
        JSON.stringify({ error: 'An unexpected error occurred.' }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
});
