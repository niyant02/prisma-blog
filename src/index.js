import { GraphQLServer, PubSub } from 'graphql-yoga';
import { makeExecutableSchema } from 'graphql-tools';
import { importSchema } from 'graphql-import';

import prisma from './prisma';
import { resolvers, fragmentReplacements } from './resolvers';

const path = require('path');
const PATH_TO_ENV = '.env';

const bodyParser = require('body-parser');

require('dotenv').config({
    path: path.resolve(process.cwd(), PATH_TO_ENV),
});

const options = {
    port: 4001,
    cors: {
        credentials: true,
    },
};

const typeDefs = importSchema('./src/schema.graphql');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const pubSub = new PubSub();

const server = new GraphQLServer({
    schema,
    resolverValidationOptions: {
        requireResolversForResolveType: false,
    },
    context(request) {
        return {
            pubSub,
            prisma,
            request,
        };
    },
    fragmentReplacements,
});

server.express.use(bodyParser.json());
server.express.use(bodyParser.urlencoded({ extended: true }));
server.express.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

server.start(options, (deets) => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
});
