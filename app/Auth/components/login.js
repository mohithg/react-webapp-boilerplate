import '../styles.scss';
const image = require('../../../public/assets/image.jpg');

class Login extends React.Component {
  render() {
    return (
      <div>
        <div style={{ backgroundImage: `url(${image})` }} className="icon-test" />
        Welcome to login page
      </div>
    );
  }
}

export default Login;
