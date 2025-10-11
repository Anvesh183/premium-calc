const { createClient } = require("@supabase/supabase-js");

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

exports.handler = async function (event, context) {
  // **DEBUGGING STEP:** Check if the environment variables are missing
  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error:
          "Supabase URL or Key is missing. Please check your environment variables in your hosting provider's settings.",
      }),
    };
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    const [ratesResponse, zonesResponse] = await Promise.all([
      supabase.from("rates").select("*"),
      supabase.from("earthquake_zones").select("*"),
    ]);

    // Check for errors in the Supabase responses
    if (ratesResponse.error)
      throw new Error(`Rates Fetch Error: ${ratesResponse.error.message}`);
    if (zonesResponse.error)
      throw new Error(`Zones Fetch Error: ${zonesResponse.error.message}`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        rates: ratesResponse.data,
        zones: zonesResponse.data,
      }),
    };
  } catch (error) {
    // Return the specific error message
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
