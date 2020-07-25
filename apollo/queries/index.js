import { gql } from 'apollo-boost';



export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID) {
      portfolio(id: $id) {
        _id
        title
        jobTitle
        description
        company
        companyWebsite
        startDate
        endDate
      }
    }
`;

export const GET_PORTFOLIOS = gql`
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

export const CREATE_PORTFOLIO = gql`
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

export const UPDATE_PORTFOLIO = gql`
  mutation UpdatePortfolio($id: ID) {
    updatePortfolio(id: $id, input: {
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
