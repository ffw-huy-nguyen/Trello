// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const config = {
  apiUrl: process.env.API_URL || 'http://localhost:8083'
};
export default config;
