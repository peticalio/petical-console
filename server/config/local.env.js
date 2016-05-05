'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  domain:           'http://localhost:8080',
  CLIENT_ID:        'majimenatestapp',
  CLIENT_SECRET:    'mySecretOAuthSecret',
  RECAPTCHA_KEY:    '6LdjCx8TAAAAABFrnBr2I-iS5nHbImdNlyvySZjM'
};
