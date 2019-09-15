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

prisma.mutation
  .updatePost({
    data: {
      published: true,
      body: 'Newly updated post'
    },
    where: {
      id: 'ck0kvwxbl009i0742jb4pggmt'
    }
  })
  .then(data => {
    console.log(data);
    return prisma.query.posts(null, '{id title body published author { id name} }');
  })
  .then(data => {
    console.log(JSON.stringify(data, undefined, 2));
  });
