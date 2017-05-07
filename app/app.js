import ReactDOM from 'react-dom';
import Routes from './routes';
import './styles.scss';

const App = () => (
  <Routes />
);

ReactDOM.render(<App />, document.getElementById('app'));

// HMR
if (module.hot) {
  module.hot.accept();
}
