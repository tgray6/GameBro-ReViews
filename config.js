'use strict';

// exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/GameBro';
// exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/GameBroTest';
// exports.PORT = process.env.PORT || 8080;



exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://tgray6:sagesage1@ds113648.mlab.com:13648/gamebro';

exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://tgray6:sagesage1@ds121543.mlab.com:21543/gamebrotest';;
exports.PORT = process.env.PORT || 8080;

exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';