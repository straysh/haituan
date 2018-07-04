module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'haituan',
      script    : 'server.js',
      instances : 1,
      exec_mode : 'fork',
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
      },
    },

  ],

};
