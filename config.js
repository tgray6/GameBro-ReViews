'use strict';

exports.DATABASE_URL = 'mongodb://tgray6:sagesage1@ds113648.mlab.com:13648/gamebro';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/GameBroTest';
exports.PORT = process.env.PORT || 8080;