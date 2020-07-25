
import { useQuery } from '@apollo/react-hooks';
import { GET_PORTFOLIO } from '../../apollo/queries';
import { useRouter } from 'next/router';
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';


const PortfolioDetail = () => {
  const { id } = useRouter().query
  const { data } = useQuery(GET_PORTFOLIO, { variables: { id } });

  const portfolio = data?.portfolio || {};

  const { title, jobTitle, companyWebsite, startDate, endDate, description } = portfolio;
  return (
    <div className="portfolio-detail">
      <div className="container">

        <div className="jumbotron">
          <h1 className="display-3">{title}</h1>
          <p className="lead">{jobTitle}</p>
          <p>
            <a className="btn btn-lg btn-success" href={companyWebsite} role="button">
              See Company</a>
          </p>
        </div>

        <div className="row marketing">
          <div className="col-lg-6">
            <h4 className="title">Location</h4>
            <p className="text">Some Location</p>

            <h4 className="title">Start Date</h4>
            <p className="text">{startDate}</p>
          </div>

          <div className="col-lg-6">
            {/* TODO: days later... */}
            <h4 className="title">Days</h4>
            <p className="text">44</p>

            <h4 className="title">End Date</h4>
            <p className="text">{endDate}</p>
          </div>
          <div className="col-md-12">
            <hr />
            <h4 className="title">Description</h4>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}


// INITIALIZE PROPS FROM FUNCTIONAL COMPONENT
// PortfolioDetail.getInitialProps = async ({ query }) => {
//   const { data: { data: { portfolio } } } = await fetchPortfolio(query.id);
//   return { portfolio };
// }

// class PortfolioDetail extends React.Component {

//   // Called on the server
//   static getInitialProps({query}) {
//     // What you return here will get into this.props
//     return { query };
//   }

//   render() {
//     const { id } = this.props.query;
//     return (
//       <h1>I'm detail Page with ID: {id} </h1>
//     )
//   }
// }

export default withApollo(PortfolioDetail, { getDataFromTree }); 