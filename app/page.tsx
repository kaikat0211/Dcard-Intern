import Nav from './components/Nav'
import { options } from './api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
export default async function Home() {
  const session = await getServerSession(options)
  return (
    <>
      <Nav user={session?.user}/>
    </>
  );
}
