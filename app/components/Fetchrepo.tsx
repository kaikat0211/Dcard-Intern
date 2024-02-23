// import { auth } from '../api/auth/[...nextauth]/options';
// export default async function Fetchrepo() {
//   const session = await auth();
//   const token = session?.token;
//   const response = await fetch(`https://api.github.com/users/${session?.user?.name}/repos`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     });
//   const data = await response.json();
//   return (
//     <></>
//   );
// }
