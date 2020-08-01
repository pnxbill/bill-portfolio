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
      startDate: "2012-12-12T23:59Z"
      endDate: "2013-11-14T23:59Z"
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
      startDate: "2012-12-12T23:59Z"
      endDate: "2013-11-14T23:59Z"
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

export const DELETE_PORTFOLIO = gql`
  mutation DeletePortfolio($id: ID) {
    deletePortfolio(id: $id) {
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

// START AUTH QUERIES

export const SIGN_UP = gql`
  mutation SignUp(
    $avatar: String
    $username: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    signUp(input: {
      avatar: $avatar
      username: $username
      email: $email
      password: $password
      passwordConfirmation: $passwordConfirmation
    })
  }
`;

// END AUTH QUERIES
