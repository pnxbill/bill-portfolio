import Axios from "axios";
import PortfolioCard from "../../components/portfolios/PortfolioCard";
import Link from 'next/link';
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_PORTFOLIOS, CREATE_PORTFOLIO, UPDATE_PORTFOLIO } from "../../apollo/queries";
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';


// Delete porfolio graphQL mutation
const queryDeletePortfolio = (id) => {
  const query = `
      mutation DeletePortfolio {
        deletePortfolio(id: "${id}") {
          _id
          title
          company
          companyWebsite
          location
          jobTitle
          description
          startDate
          endDate
        }
      }
    `;

  return Axios.post(`http://localhost:3000/graphql`, { query })
}
const Portfolios = () => {
  const { data } = useQuery(GET_PORTFOLIOS);

  const [updatePortfolio] = useMutation(UPDATE_PORTFOLIO)

  const [createPortfolio] = useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio } }) {
      const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: { portfolios: [...portfolios, createPortfolio] }
      });
    }
  });

  const portfolios = data?.portfolios || [];

  const deletePortfolio = async (id) => {
    await queryDeletePortfolio(id);
  }

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
                  onClick={() => deletePortfolio(portfolio._id)}
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