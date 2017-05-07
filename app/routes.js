import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Root from './Core/components/root';
import Login from './Auth/components/login';

const Routes = () => (
  <Router>
    <Root>
      <Route path="/login" component={Login} />
    </Root>
  </Router>
);

export default Routes;
