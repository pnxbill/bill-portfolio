import { useEffect } from 'react';
import { useRouter } from 'next/router';
import withApollo from '@/hoc/withApollo';
import { useSignOut } from '../apollo/actions';
import BaseLayout from '@/layouts/BaseLayout';

const Logout = ({ apollo }) => { // Called apollo from withApollo
  const [signOut] = useSignOut();
  const { push } = useRouter();

  useEffect(() => {
    signOut().then(() => {
      apollo.resetStore().then(() => push('/login'))
    })
  }, []);

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Logout</h1>
            <p>Signing out...</p>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default withApollo(Logout);