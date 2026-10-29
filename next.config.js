/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com; media-src 'self' https://*.amazonaws.com https://*.r2.cloudflarestorage.com blob:; img-src 'self' data: blob: https:; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.amazonaws.com https://*.r2.cloudflarestorage.com https://*.upstash.io;" }
      ]
    }];
  }
};
module.exports = nextConfig;
