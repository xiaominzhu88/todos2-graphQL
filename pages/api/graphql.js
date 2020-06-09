import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-micro';

const todos = [
  {
    title: 'Reading and Coding, yeah',
    checked: true,
    author: { name: 'Zhu', role: 'Admin' },
    id: '1',
  },
  {
    title: 'Shopping',
    checked: false,
    author: { name: 'Lola', role: 'User' },
    id: '2',
  },
  {
    title: 'Sleeping',
    checked: true,
    author: { name: 'Swen', role: 'User' },
    id: '3',
  },
];

const typeDefs = gql`
  type Query {
    todo(id: String!): Todo
    todos(checked: Boolean): [Todo]
  }

  type Mutation {
    createTodo(title: String!): Todo
  }

  type Todo {
    title: String
    checked: Boolean
    author: User
    id: String
  }

  type User {
    name: String
    role: String
  }
`;

const resolvers = {
  Query: {
    todo: (parent, args) => {
      return todos.find((todo) => todo.id === args.id);
    },
    todos: (parent, args) => {
      return args.checked !== undefined
        ? todos.filter((todo) => todo.checked === args.checked)
        : todos;
    },
  },
  Mutation: {
    createTodo: (parent, args) => {
      const todo = {
        id: Math.round(Math.random() * 100).toString(),
        title: args.title,
        checked: false,
        author: { name: 'Rudi' },
      };
      todos.push(todo);
      return todo;
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default new ApolloServer({ schema }).createHandler({
  path: '/api/graphql',
});
