import { gql } from 'apollo-boost';


// START PORTFOLIO QUERIES
export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID) {
      portfolio(id: $id) {
        _id
        daysOfExperience @client
        title
        jobTitle
        description
        company
        location
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

export const GET_USER_PORTFOLIOS = gql`
  query UserPortfolios {
    userPortfolios {
      _id
      title
      jobTitle
      startDate
      endDate
    }
  }
`;

export const CREATE_PORTFOLIO = gql`
  mutation CreatePortfolio(
    $title: String,
    $company: String,
    $companyWebsite: String,
    $location: String,
    $jobTitle: String,
    $description: String,
    $startDate: String,
    $endDate: String,
  ) {
    createPortfolio(input: {
      title: $title
      company: $company
      companyWebsite: $companyWebsite
      location: $location
      jobTitle: $jobTitle
      description: $description
      startDate: $startDate
      endDate: $endDate
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
  mutation UpdatePortfolio(
    $id: ID
    $title: String
    $company: String
    $companyWebsite: String
    $location: String
    $jobTitle: String
    $description: String
    $startDate: String
    $endDate: String
  ) {
    updatePortfolio(id: $id, input: {
      title: $title
      company: $company
      companyWebsite: $companyWebsite
      location: $location 
      jobTitle: $jobTitle 
      description: $description 
      startDate: $startDate
      endDate: $endDate
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

// END PORTFOLIO QUERIES

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

export const SIGN_IN = gql`
  mutation SignIn(
    $email: String!
    $password: String!
  ) {
    signIn(input: {
      email: $email
      password: $password
    }) {
      _id
      username
      role
      avatar
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

export const GET_USER = gql`
  query User {
    user {
      _id
      username
      role
    }
  }
`;

// END AUTH QUERIES

// START FORUM QUERIES

export const FORUM_CATEGORIES = gql`
  query ForumCategories {
    forumCategories {
      title
      subTitle
      slug
    } 
  }
`;

const topicResponse = `
  _id
  slug
  title
  content
  user {
    username
    avatar
  }
  forumCategory {
    _id
    title
    slug
  }
`

export const TOPICS_BY_CATEGORY = gql`
  query TopicsByCategory($slug: String) {
    topicsByCategory(slug: $slug) {
      ${topicResponse}
    }
  }
`;

export const TOPIC_BY_SLUG = gql`
  query TopicBySlug($slug: String) {
    topicBySlug(slug: $slug) {
      ${topicResponse}
    }
  }
`;

export const CREATE_TOPIC = gql`
  mutation CreateTopic(
    $title: String
    $content: String
    $forumCategory: String
  ) {
    createTopic(input:{
      title: $title
      content: $content
      forumCategory: $forumCategory
    }) {
      ${topicResponse}
    }
  }
`;

const postResponse = `
  _id
  content
  slug
  createdAt
  user {
    username
    avatar
  }
  parent {
    content
    user {
      username
      avatar
    }
  }
`;

export const POSTS_BY_TOPIC = gql`
  query PostsByTopic($slug: String) {
    postsByTopic(slug: $slug) {
      ${postResponse}
    }
  }
`;
