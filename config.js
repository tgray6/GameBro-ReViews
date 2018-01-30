'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/GameBro';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/GameBroTest';
exports.PORT = process.env.PORT || 8080;