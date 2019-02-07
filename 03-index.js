const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
    type Schema {query: Query}
    type Video {
        id: ID,
        title: String,
        duration: Int,
        released: Boolean
    }
    type Query {
        video: Video
    }
`);

const resolvers = {
    video: () => ({
        id: () => '1',
        title: () => "bar",
        duration: () => 180,
        released: () => true
    })
};

const query = `
    query myFirstQuery {
        video {
            id,
            title,
            duration,
            released
        }
    }
`;

graphql(schema, query, resolvers)
    .then(result => console.log(result))
    .catch(error => console.log(error));