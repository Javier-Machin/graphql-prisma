const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email });

    if (emailTaken) throw new Error('Email already exist');

    return prisma.mutation.createUser({ data: args.data }, info);
  },
  updateUser(parent, args, { prisma }, info) {
    const { id, data } = args;

    return prisma.mutation.updateUser(
      {
        data,
        where: {
          id
        }
      },
      info
    );
  },
  async deleteUser(parent, args, { prisma }, info) {
    const userExists = await prisma.exists.User({ id: args.id });

    if (!userExists) throw new Error('User not found');

    return prisma.mutation.deleteUser({ where: { id: args.id } }, info);
  },
  createPost(parent, args, { prisma }, info) {
    const { author, title, body, published } = args.data;
    const userExists = prisma.exists.User({ id: author });

    if (!userExists) throw new Error('User not found');

    return prisma.mutation.createPost(
      {
        data: {
          title,
          body,
          published,
          author: {
            connect: {
              id: author
            }
          }
        }
      },
      info
    );
  },
  updatePost(parent, args, { prisma }, info) {
    const { id, data } = args;

    return prisma.mutation.updatePost({ where: { id }, data }, info);
  },
  deletePost(parent, args, { prisma }, info) {
    return prisma.mutation.deletePost({ where: { id: args.id } }, info);
  },
  createComment(parent, args, { prisma }, info) {
    const { author, post, text } = args.data;

    return prisma.mutation.createComment(
      {
        data: {
          text,
          author: {
            connect: {
              id: author
            }
          },
          post: {
            connect: {
              id: post
            }
          }
        }
      },
      info
    );
  },
  updateComment(parent, args, { prisma }, info) {
    const { id, data } = args;

    return prisma.mutation.updateComment({ where: { id }, data }, info);
  },
  deleteComment(parent, args, { prisma }, info) {
    return prisma.mutation.deleteComment({ where: { id: args.id } }, info);
  }
};

export default Mutation;
