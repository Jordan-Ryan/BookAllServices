// Supabase Configuration
// Replace these with your actual Supabase credentials
const SUPABASE_CONFIG = {
    URL: 'YOUR_SUPABASE_PROJECT_URL',
    ANON_KEY: 'YOUR_SUPABASE_ANON_KEY'
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUPABASE_CONFIG;
} 