import dotenv from 'dotenv';

dotenv.config();

const required = ['GROQ_API_KEY','SUPABASE_SERVICE_KEY','SUPABASE_URL','RESEND_API_KEY'];

for (const key of required) {
  if (!process.env[key]) {
    console.error(`FATAL: Missing required environment variable: ${key}`);
    process.exit(1);
  }
}