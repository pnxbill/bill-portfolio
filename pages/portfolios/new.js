
import PortfolioForm from '@/components/forms/PortfolioForm';
import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';
import { useRouter } from 'next/router';
import { useCreatePortfolio } from '../../apollo/actions';


const PortfolioNew = () => {
  const router = useRouter();
  const [createPortfolio, { error }] = useCreatePortfolio();

  const errorMessage = (err) => {
    return err.graphQLErrors[0]?.message || "Oooooops, something went wrong..."
  }

  const handleSubmit = async (data) => {
    await createPortfolio({ variables: data });
    router.push('/portfolios')

  }


  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Create New Portfolio</h1>
            <PortfolioForm onSubmit={handleSubmit} />
            {error && <div className="alert alert-danger">{errorMessage(error)}</div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default withApollo(withAuth(PortfolioNew, ['admin', 'instructor']));