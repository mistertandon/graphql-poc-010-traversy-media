
const { GraphQLObjectType, GraphQLSchema, GraphQLNonNull,
    GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLEnumType } = require('graphql');
const { projects, clients } = require('../sampleData.js');
const Project = require("../models/Project");
const Client = require("../models/Client");

// client type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
});

//project type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                // return clients.find(client => client.id === parent.clientId)
                return Client.findById(parent.clientId)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return clients.find(client => client.id === args.id)
                return Client.findById(args.id);
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                // return clients
                return Client.find({});
            }
        },
        project: {
            type: ProjectType,
            args: {
                id: { type: GraphQLID },

            },
            resolve: (parent, args) => {
                // return projects.find(project => project.id === args.id)
                return Project.findById(args.id);
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve: (parent, args) => {
                // return projects
                return Project.find();
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProject: {
            type: ProjectType,
            args: {
                name: {
                    type: GraphQLNonNull(GraphQLString)
                },
                description: {
                    type: GraphQLNonNull(GraphQLString)
                },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            NOT_STARTED: { value: 'not started' },
                            IN_PROGRESS: { value: 'in progress' },
                            COMPLETED: { value: 'completed' },
                        },
                    }),
                    defaultValue: 'not started',
                },
                clientId: {
                    type: GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args) {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                });

                return project.save();
            }
        },
        addClient: {
            type: ClientType,
            args: {
                name: {
                    type: GraphQLNonNull(GraphQLString),
                },
                email: {
                    type: GraphQLNonNull(GraphQLString),
                },
                phone: {
                    type: GraphQLNonNull(GraphQLString),
                }
            },
            resolve(parent, args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                });
                return client.save();
            }
        },
        deleteClient: {
            type: ClientType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args) {
                return Client.findByIdAndDelete(args.id);
            }

        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})