const api = import.meta.env.VITE_API_URL;
const app = import.meta.env.VITE_APP_URL;

const config = {
  api,
  basename: '/',
  app
}

export default config;
