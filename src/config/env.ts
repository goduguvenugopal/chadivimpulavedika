const env = {
  API_URL: import.meta.env.VITE_API_URL as string,
  SUPPORT_EMAIL: import.meta.env.VITE_SUPPORT_EMAIL as string,
  SUPPORT_PHONE: import.meta.env.VITE_SUPPORT_PHONE as string,
};

// Optional: Validate required envs in development
if (!env.API_URL) {
  console.error("❌ VITE_API_URL is missing in .env");
}

if (!env.SUPPORT_EMAIL) {
  console.error("❌ VITE_SUPPORT_EMAIL is missing in .env");
}

if (!env.SUPPORT_PHONE) {
  console.error("❌ VITE_SUPPORT_PHONE is missing in .env");
}

export default env;
