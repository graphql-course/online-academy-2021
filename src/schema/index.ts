
import "graphql-import-node";
import typeDefs from "./schema.graphql";
import { makeExecutableSchema } from "apollo-server-express";
import { GraphQLSchema } from "graphql";
import resolvers from "./../resolvers";


const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema;