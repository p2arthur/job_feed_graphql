import cors from 'cors';
import express from 'express';
import { readFile } from 'node:fs/promises';
import { authMiddleware, handleLogin } from './auth.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMidleware } from '@apollo/server/express4';
import { resolvers } from './resolvers.js';

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post('/login', handleLogin);

//Integrating apollo to the server:

//Defining the types of the schema based on a .graphql file:
const typeDefs = await readFile('./schema.graphql', 'utf-8');

//create new apollo instance passing options - typeDefs and resolvers
const apolloServer = new ApolloServer({ typeDefs, resolvers });

// start the apollo server
await apolloServer.start();

//set apollo middleware to forward requsts made to the /graphql route
app.use('/graphql', apolloMidleware(apolloServer));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL running on http://localhost:${PORT}/graphql`);
});
