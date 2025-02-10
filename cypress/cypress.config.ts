import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    specPattern: "cypress/component/**/*.cy.{js,ts,jsx,tsx}",
  },

  e2e: {
    baseUrl: "http://127.0.0.1:3001/",
  },
});
