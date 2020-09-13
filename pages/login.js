import LoginForm from '../components/forms/LoginForm';
import withApollo from '@/hoc/withApollo';
import { useSignIn } from '../apollo/actions';
import Redirect from '../components/shared/Redirect';
import { useRouter } from 'next/router';
import BaseLayout from '@/layouts/BaseLayout';
import { useEffect, useState } from 'react';
import messages from '@/variables/messageCodes';

const Login = () => {
  const [signIn, { data, loading, error }] = useSignIn();

  const router = useRouter();
  // const [message, setMessage] = useState(router.query.message);
  const { message } = router.query;


  // useEffect(() => {
  //   setTimeout(() => (setMessage('')), 4000);
  // }, [message])

  const errorMessage = (err) => {
    return err.graphQLErrors[0]?.message || "Oooooops, something went wrong..."
  }

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Login</h1>
            {message && <div className={`alert alert-${messages[message].status}`}>{messages[message].value}</div>}
            <LoginForm
              onSubmit={(data) => signIn({ variables: data })}
              loading={loading}
            />
            {data && data.signIn && <Redirect to="/" />}
            {error && <div className="alert alert-danger">{errorMessage(error)}</div>}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default withApollo(Login);