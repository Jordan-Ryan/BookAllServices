// Supabase Configuration
const SUPABASE_CONFIG = {
    URL: 'https://dvapdmicanfxyxplavgy.supabase.co',
    ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2YXBkbWljYW5meHl4cGxhdmd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMTk4NjMsImV4cCI6MjA2OTg5NTg2M30.j5aw91slJZg60lJpnCKIX7QLOM1sC3i9Y5CNrFvrfiw'
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUPABASE_CONFIG;
} 