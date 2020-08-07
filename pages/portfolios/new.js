
import LoginForm from '../components/forms/LoginForm';
import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';


const PortfolioNew = () => {


  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Create New Portfolio</h1>

          </div>
        </div>
      </div>
    </>
  )
}

export default withApollo(withAuth(PortfolioNew, 'admin'));