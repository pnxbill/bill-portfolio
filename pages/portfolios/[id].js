
import { useRouter } from 'next/router';


const PortfolioDetail = () => {
  const { id } = useRouter().query; 
  return (
    <h1>I'm detail Page with ID: {id}</h1>
  )
}

// INITIALIZE PROPS FROM FUNCTIONAL COMPONENT
// PortfolioDetail.getInitialProps = ({ query }) => {
//   return { query };
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

export default PortfolioDetail; 