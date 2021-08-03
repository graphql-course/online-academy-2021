"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
const apollo_server_core_1 = require("apollo-server-core");
class Server {
    constructor(schema) {
        this.DEFAULT_PORT_SERVER = process.env.DEFAULT_PORT_SERVER || 3003;
        if (schema === undefined) {
            throw new Error("Need GraphQL Schema to work in API GraphQL");
        }
        this.schema = schema;
        this.initialize();
    }
    initialize() {
        this.configExpress();
        this.configApolloServer();
        this.configRoutes();
        this.createServer();
    }
    configExpress() {
        this.app = express_1.default();
        this.app.use(compression_1.default());
    }
    configApolloServer() {
        return __awaiter(this, void 0, void 0, function* () {
            const server = new apollo_server_express_1.ApolloServer({
                schema: this.schema,
                introspection: true,
                validationRules: [graphql_depth_limit_1.default(4)],
                plugins: [apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground()],
            });
            yield server.start();
            server.applyMiddleware({ app: this.app, cors: true });
        });
    }
    configRoutes() {
        this.app.use("/hello", (_, res) => {
            res.send("Bienvenidos/as al curso de GraphQL desde 0");
        });
        this.app.get("/", function (_, res) {
            res.redirect("/graphql");
        });
    }
    createServer() {
        this.httpServer = http_1.createServer(this.app);
    }
    listen(callback) {
        this.httpServer.listen(this.DEFAULT_PORT_SERVER, () => {
            callback(+this.DEFAULT_PORT_SERVER);
        });
    }
}
exports.default = Server;
function ApolloServerPluginLandingPageDisabled() {
    throw new Error("Function not implemented.");
}
