import PortfolioCard from "../../components/portfolios/PortfolioCard";
import Link from 'next/link';
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import { useGetPortfolio, useUpdatePortfolio, useDeletePortfolio, useCreatePortfolio } from "../../apollo/actions";

const Portfolios = () => {
  const { data } = useGetPortfolio();

  const [updatePortfolio] = useUpdatePortfolio();
  const [deletePortfolio] = useDeletePortfolio();
  const [createPortfolio] = useCreatePortfolio();

  const portfolios = data?.portfolios || [];

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={createPortfolio}
        >
          Create Portfolio
        </button>
      </section>
      <section className="pb-5">
        <div className="row">
          {portfolios.map(portfolio => {
            return (
              <div key={portfolio._id} className="col-md-4">
                <Link
                  href="/portfolios/[id]" // Needs to provide a path to project page
                  as={`/portfolios/${portfolio._id}`}
                >
                  <a className="card-link">
                    <PortfolioCard portfolio={portfolio} />
                  </a>
                </Link>
                <button
                  className="btn btn-warning"
                  onClick={() => updatePortfolio({ variables: { id: portfolio._id } })}>Edit Portfolio</button>
                <button
                  className="btn btn-danger"
                  onClick={() => deletePortfolio({ variables: { id: portfolio._id } })}
                >
                  DeletePortfolio
                </button>
              </div>)
          })}

        </div>
      </section>
    </>
  )
}

export default withApollo(Portfolios, { getDataFromTree });