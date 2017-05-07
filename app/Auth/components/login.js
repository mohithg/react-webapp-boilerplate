import Form from '../../Common/components/form';
import Text from '../../Common/components/text';
import Button from '../../Common/components/button';
import '../styles.scss';

const image = require('../../../public/assets/image.jpg');

class Login extends React.Component {

  onSubmit(values) {
    console.log(values);
  }

  render() {
    return (
      <div>
        <div style={{ backgroundImage: `url(${image})` }} className="icon-test" />
        Welcome to login page
        <Form
          onSubmit={this.onSubmit}
        >
          <Text
            name="username"
          />
          <Button
            type="submit"
            value="submit"
            name="submit"
          />
        </Form>
      </div>
    );
  }
}

export default Login;
