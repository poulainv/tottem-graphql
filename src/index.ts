import { ApolloServer } from "apollo-server";
import { createContext } from "./context";
import { schema } from "./schema";
import dotenv from "dotenv";

dotenv.config();

const server = new ApolloServer({
  schema,
  context: createContext(),
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  }
});

server.listen({ port: process.env.PORT || 4000 , graphqlPath: "/graphql" }, () =>
  console.log(`🚀 Server ready at http://localhost:4000/graphql`)
);
