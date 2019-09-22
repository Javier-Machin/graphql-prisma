const Query = {
  me() {
    return {
      id: '1234030',
      name: 'Javi',
      email: 'javi@example.com'
    };
  },
  users(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query
          },
          {
            email_contains: args.query
          }
        ]
      };
    }

    return prisma.query.users(opArgs, info);
  },
  post() {
    return {
      id: 'a4032',
      title: 'post title',
      body: 'post body',
      published: true
    };
  },
  posts(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            title_contains: args.query
          },
          {
            body_contains: args.query
          }
        ]
      };
    }

    return prisma.query.posts(opArgs, info);
  },
  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info);
  }
};

export default Query;
