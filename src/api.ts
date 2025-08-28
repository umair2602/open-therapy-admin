export const API_CONFIG = {
  BASE_URL: "http://127.0.0.1:8000/api/v1",
  TIMEOUT: 10000,
};

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    GOOGLE_LOGIN: '/auth/google-login',
    CHECK_EMAIL: '/auth/check-email',
    CHECK_USERNAME: '/auth/check-username',
  },
  PROMPT: {
    GET_PROMPT: '/prompts/me',
    UPDATE_PROMPT: '/prompts/me'
  },
  EMOTIONAL_CATEGORY: "/emotional_category"
};
