'use client';

import { Karaoke } from '@/components/Karaoke';
import NavBar from '@/components/NavBar';
import { useUser, SignIn } from '@clerk/nextjs';
import { FC } from 'react';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const { user, isLoaded } = useUser();
  
  return (
    <>
      <NavBar />
      <main className="min-h-screen px-4 py-6 sm:p-8">
        {user && <Karaoke userId={user.id} />}
        {!user && isLoaded && (
          <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
            <SignIn />
          </div>
        )}
      </main>
    </>
  );
};

export default Home;