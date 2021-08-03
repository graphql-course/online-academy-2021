"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("graphql-import-node");
const schema_graphql_1 = __importDefault(require("./schema.graphql"));
const schema_1 = require("@graphql-tools/schema");
const resolvers_1 = __importDefault(require("./../resolvers"));
const schema = schema_1.makeExecutableSchema({
    typeDefs: schema_graphql_1.default,
    resolvers: resolvers_1.default
});
exports.default = schema;
