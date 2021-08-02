import Server from "./server";

import schema from "./schema";
const server = new Server(schema);

server.listen((port: number)=> console.log(`http://localhost:${port}/graphql`));