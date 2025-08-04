-- Create the beta_signups table
CREATE TABLE IF NOT EXISTS beta_signups (
  id SERIAL PRIMARY KEY,
  business_name TEXT,
  business_type TEXT,
  business_type_other TEXT,
  location TEXT,
  team_size TEXT,
  uses_software TEXT,
  current_software TEXT,
  software_pain_points TEXT,
  missing_features TEXT,
  current_system TEXT,
  why_no_digital TEXT,
  needs_lead_time TEXT,
  lead_time TEXT,
  slot_duration TEXT,
  customer_struggles TEXT[],
  reminders_help TEXT,
  rating_price INTEGER,
  rating_ease INTEGER,
  rating_design INTEGER,
  rating_support INTEGER,
  wish_list TEXT,
  contact_method TEXT,
  email TEXT,
  instagram TEXT,
  phone TEXT,
  gdpr_consent BOOLEAN,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE beta_signups ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for the form)
CREATE POLICY "Allow public inserts" ON beta_signups
  FOR INSERT WITH CHECK (true);

-- Create policy to allow reads (optional - for viewing data)
CREATE POLICY "Allow public reads" ON beta_signups
  FOR SELECT USING (true);

-- Create an index for faster queries
CREATE INDEX IF NOT EXISTS idx_beta_signups_timestamp ON beta_signups(timestamp); 