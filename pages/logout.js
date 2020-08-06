import { useEffect } from 'react';
import { useRouter } from 'next/router';
import withApollo from '@/hoc/withApollo';
import { useSignOut } from '../apollo/actions';

const Logout = ({ apollo }) => { // Called apollo from withApollo
  const [signOut] = useSignOut();
  const { push } = useRouter();

  useEffect(() => {
    signOut().then(() => {
      apollo.resetStore().then(() => push('/login'))
    })
  }, []);

  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Logout</h1>
            <p>Signing out...</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default withApollo(Logout);