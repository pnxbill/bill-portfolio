import { useGetUser } from "../apollo/actions";
import Redirect from '@/components/shared/Redirect';


export default (Component) => (props) => {
  const { data: { user } = {}, loading, error } = useGetUser({ fetchPolicy: 'network-only' });

  if (
    !loading &&
    (!user || error) &&
    typeof window !== 'undefined' // check if browser environment
  ) {
    return <Redirect to="/login" />
  }

  if (user) {
    return <Component {...props} />
  }

  return 'Authenticating...';
}