
import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';

const Redirect = ({ to, query }) => {
  const { push } = useRouter();
  useEffect(() => {
    push({ pathname: to, query })
  }, [])

  return null;
}

export default Redirect
