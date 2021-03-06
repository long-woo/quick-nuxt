module.exports = {
  apps: [
    {
      name: '{{ name }}',
      port: {{serverPort}},
      script: 'nuxt start',
      watch: true,
      env: {
        NODE_ENV: 'development'
      },
      env_test: {
        NODE_ENV: 'test'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
