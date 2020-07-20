
import App from 'next/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.scss';

import Navbar from '@/components/shared/Navbar';
import Hero from "@/components/shared/Hero"

const MyApp = ({ Component, pageProps }) => {
  const isHomePage = () => Component.name === "Home";

  return (
    <div className="portfolio-app">
      <Navbar />
      {pageProps.appData}
      {isHomePage() && <Hero />}
      <div className="container">
        <Component {...pageProps} />
      </div>
      {isHomePage() &&
        <footer id="sticky-footer" className="py-4 bg-black text-white-50 py-3">
          <div className="container text-center">
            <small>Copyright &copy; Your Website</small>
          </div>
        </footer>
      }
    </div>
  )
}


// MyApp.getInitialProps = async (context) => {
//   // Getting initial props from here will prevent Page initial props from loading, unless you do this:
//   const pageProps = App.getInitialProps && await App.getInitialProps(context);
//   return { pageProps: { appData: 'Hello _App Component', ...pageProps.pageProps } }
// }

export default MyApp;