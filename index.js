'use strict';

import 'dotenv/config';

import Server2 from './models/serverNewModel.js';

const server = new Server2();

server.listen();

//para trabajar este index new hay q campbiar el package.json  a "type": "module", "type": "commonjs"