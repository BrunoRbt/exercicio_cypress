const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://agenda-contatos-react.vercel.app/',
    supportFile: false // Adicione esta linha
  },
});