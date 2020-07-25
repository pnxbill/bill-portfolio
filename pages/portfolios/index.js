import Axios from "axios";
import PortfolioCard from "../../components/portfolios/PortfolioCard";
import Link from 'next/link';
import { useState } from "react";

// Get portfolios GraphQL query
const fetchPortfolios = () => {
  const query = `
      query Portfolios {
        portfolios {
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
// Create portfolio GraphQL mutation
const queryCreatePortfolio = () => {
  const query = `
      mutation CreatePortfolio {
        createPortfolio(input: {
          title: "JOB FLORIPA"
          company: "WAVECODE EIRELLI"
          companyWebsite: "https://wavecode.com.br"
          location: "São José, SC"
          jobTitle: "Programador"
          description: "Inserir código no teclado"
          startDate: "26/08/2019"
          endDate: "NOT YET DECIDED"
        }) {
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

// Edit portfolio GraphQL mutation
const queryUpdatePortfolio = (id) => {
  const query = `
      mutation UpdatePortfolio {
        updatePortfolio(id: "${id}", input: {
          title: "JOB FLORIPA 2"
          company: "WAVECODE EIRELLI"
          companyWebsite: "https://wavecode.com.br"
          location: "São José, SC"
          jobTitle: "Programador"
          description: "Inserir código no teclado"
          startDate: "26/08/2019"
          endDate: "NOT YET DECIDED"
        }) {
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
const Portfolios = ({ portfolios: fetchedPortfolios }) => {

  const [portfolios, setPortfolios] = useState(fetchedPortfolios);

  const createPortfolio = async () => {
    const { data: { data: { createPortfolio } } } = await queryCreatePortfolio();
    setPortfolios([...portfolios, createPortfolio])
  }

  const updatePortfolio = async (id) => {
    const { data: { data: { updatePortfolio } } } = await queryUpdatePortfolio(id);
    const index = portfolios.findIndex(p => p._id === id);
    const newPortfolios = portfolios.slice();
    newPortfolios[index] = updatePortfolio;
    setPortfolios(newPortfolios)
    // const updatedPortfolio = updatedPortfolio.map
  }

  const deletePortfolio = async (id) => {
    const { data: { data: { deletePortfolio } } } = await queryDeletePortfolio(id);
    setPortfolios(portfolios.filter(p => p._id !== id));
    // console.log(deletePortfolio);
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
                  onClick={() => updatePortfolio(portfolio._id)}>Edit Portfolio</button>
                <button
                  className="btn btn-error"
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

Portfolios.getInitialProps = async () => {
  const { data: { data: { portfolios } } } = await fetchPortfolios();

  return { portfolios };
}

export default Portfolios;