import { createServer, Server as HTTPServer } from "http";
import cors from "cors";
import compression from "compression";
import express, { Application } from "express";
import { GraphQLSchema } from "graphql";
import { ApolloServer } from "apollo-server-express";
import depthLimit from 'graphql-depth-limit'
class Server {
  private app!: Application;
  private httpServer!: HTTPServer;
  private schema!: GraphQLSchema;
  private readonly DEFAULT_PORT_SERVER =
    process.env.DEFAULT_PORT_SERVER || 3003;
  constructor(schema: GraphQLSchema) {
    if (schema === undefined) {
      throw new Error("Need GraphQL Schema to work in API GraphQL");
    }
    this.schema = schema;
    this.initialize();
  }

  /**
   * Inicializar todas las configuraciones establecidas en el servidor
   */
  private initialize() {
    this.configExpress();
    this.configApolloServer();
    this.configRoutes();
    this.createServer();
  }

  private configExpress() {
    this.app = express();

    this.app.use(cors());

    this.app.use(compression());
  }

  private async configApolloServer() {
    // COnfigurar el servidor apollo server

    const server = new ApolloServer({
      schema: this.schema,
      introspection: true,
      validationRules: [ depthLimit(4) ]
    });
    await server.start();
    server.applyMiddleware({ app: this.app });
  }

  private configRoutes() {
    this.app.use("/hello", (_, res) => {
      res.send("Bienvenidos/as al curso de GraphQL desde 0");
    });

    this.app.get("/", function (_, res) {
      res.redirect("/graphql");
    });
  }

  private createServer() {
    this.httpServer = createServer(this.app);
  }

  listen(callback: (port: number) => void): void {
    this.httpServer.listen(this.DEFAULT_PORT_SERVER, () => {
      callback(+this.DEFAULT_PORT_SERVER);
    });
  }
}

export default Server;
