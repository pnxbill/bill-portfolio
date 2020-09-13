


import PortfolioForm from '@/components/forms/PortfolioForm';
import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';
import BaseLayout from '@/layouts/BaseLayout';
import { useGetPortfolio } from '@/apollo/actions';
import { useRouter } from 'next/router';
import { useUpdatePortfolio } from '@/apollo/actions';


const PortfolioEdit = () => {
  const { id } = useRouter().query;
  const { data } = useGetPortfolio({ variables: { id } });
  const [updatePortfolio, { error }] = useUpdatePortfolio();

  const errorMessage = (err) => {
    return err.graphQLErrors[0]?.message || "Oooooops, something went wrong..."
  }

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Edit Portfolio</h1>
            {data?.portfolio &&
              <PortfolioForm
                initialData={data.portfolio}
                onSubmit={data => updatePortfolio({ variables: { id, ...data } })}
              />
            }
            {error && <div className="alert alert-danger">{errorMessage(error)}</div>}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default withApollo(withAuth(PortfolioEdit, ['admin', 'instructor']));