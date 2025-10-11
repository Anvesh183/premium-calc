const { createClient } = require("@supabase/supabase-js");

// Use the correct REACT_APP_ prefixed environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

exports.handler = async function (event, context) {
  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error:
          "Supabase URL or Key is missing. Please check your environment variables in your Netlify settings.",
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
