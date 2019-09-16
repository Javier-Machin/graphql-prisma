import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
});

// prisma.query.users(null, '{ id name email posts { id title } }').then(data => {
//   console.log('*** USERS ***');
//   console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.query.comments(null, '{ id text author { id name } }').then(data => {
//   console.log('*** COMMENTS ***');
//   console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: 'GraphQL 101',
//         body: '',
//         published: false,
//         author: {
//           connect: {
//             id: 'ck0h1pq1b0014070974vlo364'
//           }
//         }
//       }
//     },
//     '{ id title body published }'
//   )
//   .then(data => {
//     console.log(data);
//     return prisma.query.users(null, '{ id name email posts { id title } }');
//   })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

// prisma.exists
//   .Comment({
//     author: {
//       name: 'Kevin Costner'
//     }
//   })
//   .then(exists => {
//     console.log(exists);
//   });

const createPostForUser = async (authorId, data) => {
  const userExists = await prisma.exists.User({
    id: authorId
  });

  if (!userExists) throw new Error('User not found');

  const post = await prisma.mutation.createPost(
    {
      data: {
        ...data,
        author: {
          connect: {
            id: authorId
          }
        }
      }
    },
    '{ author { id name email posts { id title published } } }'
  );

  return post.author;
};

// createPostForUser('ck0h3ho3l00we07099lrw2hfi', {
//   title: 'Great books to read',
//   body: 'The war of Art',
//   published: true
// })
//   .then(user => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch(error => console.log(error));

// prisma.mutation
//   .updatePost({
//     data: {
//       published: true,
//       body: 'Newly updated post'
//     },
//     where: {
//       id: 'ck0kvwxbl009i0742jb4pggmt'
//     }
//   })
//   .then(data => {
//     console.log(data);
//     return prisma.query.posts(null, '{id title body published author { id name} }');
//   })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

const updatePostForUser = async (postId, data) => {
  const postExists = await prisma.exists.Post({
    id: postId
  });

  if (!postExists) throw new Error('Post not found');

  const post = await prisma.mutation.updatePost(
    {
      data,
      where: {
        id: postId
      }
    },
    '{ author { id name email posts { id title published } } }'
  );

  return post.author;
};

// updatePostForUser('ck0kwki8v00ov0742yt6u2qtj', {
//   title: 'Great books to read updated right now again 2'
// })
//   .then(user => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch(error => console.log(error));
