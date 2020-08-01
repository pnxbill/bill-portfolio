
import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';

const Redirect = ({ to }) => {
  const { push } = useRouter();
  useEffect(() => {
    push({ pathname: to })
  }, [])

  return null;
}

export default Redirect
