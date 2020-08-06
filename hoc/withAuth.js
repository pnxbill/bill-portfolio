import { useGetUser } from "../apollo/actions";
import Redirect from '@/components/shared/Redirect';


export default (Component, role) => (props) => {
  const { data: { user } = {}, loading, error } = useGetUser({ fetchPolicy: 'network-only' });

  if (
    !loading &&
    (!user || error) &&
    typeof window !== 'undefined' // check if browser environment
  ) {
    return <Redirect to="/login" />
  }

  if (user) {
    if (role && user.role !== role) return <Redirect to="/login" />
    return <Component {...props} />
  }

  return 'Authenticating...';
}