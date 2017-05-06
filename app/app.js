import ReactDOM from 'react-dom';
import './styles.scss';

class App extends React.Component {
  render() {
    return (
      <div className="heading">
        Hello World
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// HMR
if (module.hot) {
  module.hot.accept();
}
