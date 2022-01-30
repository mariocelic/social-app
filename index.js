const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post');
const { MONGODB } = require('./config.js');

const typeDefs = gql`
    type Post{
            id: ID!
            body: String!
            createdAt: String!
            username: String!
        }
    type Query {
        getPosts: [Post]
    }
`;

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const post = await Post.find();
                return post;
            } catch (error) {
                throw new Error(error);
            }
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDb')
        return server.listen({ port: 5000 });
    })
    .then((result) => {
        console.log(`Server running at ${result.url}`)
    });
