const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
    type Schema {query: Query}
    type Query {foo: String}
`);

const resolvers = {
    foo: () => 'bar'
};

const query = `
    query myFirstQuery {
        foo
    }
`;

graphql(schema, query, resolvers)
    .then(result => console.log(result))
    .catch(error => console.log(error));