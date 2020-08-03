import LoginForm from '../components/forms/LoginForm';

const Login = () => {

  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Login</h1>
            <LoginForm onSubmit={(data) => alert(JSON.stringify(data))} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;