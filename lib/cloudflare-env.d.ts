import "server-only";

declare global {
  interface CloudflareEnv {
    AUTH_EMAIL_FROM?: string;
    HTS_PUBLIC_URL?: string;
    HTS_SUPER_ADMIN_BOOTSTRAP_SECRET?: string;
    RESEND_API_KEY?: string;
    LEARNING_PRIVATE_FILES?: R2Bucket;
  }
}

export {};
