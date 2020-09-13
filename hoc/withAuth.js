import { useGetUser } from "../apollo/actions";
import Redirect from '@/components/shared/Redirect';


export default (Component, role, options = { ssr: false }) => {
  function WithAuth(props) {
    const { data: { user } = {}, loading, error } = useGetUser({ fetchPolicy: 'network-only' });

    if (
      !loading &&
      (!user || error) &&
      typeof window !== 'undefined' // check if browser environment
    ) {
      return <Redirect to="/login" query={{
        message: 'NOT_AUTHENTICATED'
      }} />
    }

    if (user) {
      if (role && !role.includes(user.role)) return (
        <Redirect to="/login" query={{
          message: 'NOT_AUTHORIZED'
        }} />
      )
      return <Component {...props} />
    }

    return <p>Authenticating...</p>;
  }

  if (options.ssr) {
    const serverRedirect = (res, path) => {
      res.redirect(path);
      res.end();
      return {};
    }

    WithAuth.getInitialProps = async (context) => {
      const { req, res } = context;
      if (req) {
        const { user } = req;

        if (!user) return serverRedirect(res, '/login?message=NOT_AUTHENTICATED');

        if (role && !role.includes(user.role)) return serverRedirect(res, '/login?message=NOT_AUTHORIZED');

        const pageProps = Component.getInitialProps && await Component.getInitialProps(context);
        return { ...pageProps }
      }
    }
  }



  return WithAuth;
}