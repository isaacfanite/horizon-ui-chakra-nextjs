// src/components/withAuth.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { Spinner, Center } from '@chakra-ui/react';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/auth/sign-in');
      }
    }, [user, router]);

    if (!user) {
      return (
        <Center h="100vh">
          <Spinner size="xl" />
        </Center>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
