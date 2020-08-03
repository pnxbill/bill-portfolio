const { default: LoginForm } = require("../components/forms/LoginForm")

const Login = () => {

  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Login</h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;