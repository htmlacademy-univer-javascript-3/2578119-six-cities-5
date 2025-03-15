import {Link} from 'react-router-dom';
import {AppRoutes} from '../../constants/enum.ts';

export function NotFoundPage() {
  return <div>Page not found <Link to={AppRoutes.Main}>Go to homepage</Link></div>;
}
