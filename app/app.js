import React from 'react';
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

ReactDOM.render(<App />, Document.getElementById('app'));
