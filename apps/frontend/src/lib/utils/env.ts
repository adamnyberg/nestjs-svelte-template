 interface EnvVariables {
  API_URL: string;
}

interface EnvConfig {
  prod: EnvVariables;
  dev: EnvVariables;
}
 
 const env: EnvConfig = {
  prod: {
    API_URL: 'https://nestjs-svelte-template-production.up.railway.app',
  },
  dev: {
    API_URL: 'http://localhost:3000',
  },
};

export default function getEnvVariables() {
  return process.env.NODE_ENV === 'production'? env.prod : env.dev;
}
