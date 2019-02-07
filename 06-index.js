const express = require('express');
const graphqlHTTP = require('express-graphql');
const PORT = process.env.port || 3000;

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean
} = require('graphql');

const videoType = new GraphQLObjectType({
    name: 'VideoType',
    description: "A video on my domain",
    fields: {
        id: {
            type: GraphQLID,
            description: 'The id for the video'
        },
        title: {
            type: GraphQLString,
            description: 'the title of the video'
        },
        duration: {
            type: GraphQLInt,
            description: 'The duration of the video (in seconds)'
        },
        released: {
            type: GraphQLBoolean,
            description: 'Whether or not the viewer has released the video'
        }
    }
});

const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type',
    fields: {
        video: {
            type: videoType,
            resolve: () => new Promise(resolve => {
                resolve({
                    id: () => '1',
                    title: () => 'First Video',
                    duration: () => 180,
                    released: () => true
                });
            })
        }
    }
});

const schema = new GraphQLSchema({
    query: queryType
});

const server = express();

server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});