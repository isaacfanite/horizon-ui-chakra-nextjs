import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userDetails = localStorage.getItem('userDetails');
      
      if (userDetails) {
        router.push('/admin/default');
      } else {
        router.push('/login');
      }
    }
  }, [router]);

}
