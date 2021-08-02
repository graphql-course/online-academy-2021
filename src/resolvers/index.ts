import mutationResolvers from "./mutation";
import queryResolvers from "./query";
import typesResolvers from "./types";


const resolvers = {
    ...queryResolvers,
    ...mutationResolvers,
    ...typesResolvers
};


export default resolvers;