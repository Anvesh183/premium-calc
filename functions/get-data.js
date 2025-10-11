const { createClient } = require("@supabase/supabase-js");

// Ensure you are using the REACT_APP_ prefix
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

exports.handler = async function (event, context) {
  // ... (the rest of the function remains the same)
  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error:
          "Supabase URL or Key is missing. Please check your REACT_APP_ environment variables in your Netlify settings.",
      }),
    };
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    const [ratesResponse, zonesResponse] = await Promise.all([
      supabase.from("rates").select("*"),
      supabase.from("earthquake_zones").select("*"),
    ]);

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
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
