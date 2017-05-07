import { HOC } from 'formsy-react';

class Button extends React.Component {
  render() {
    return (
      <button
        type={this.props.type}
      >
        {this.props.value}
      </button>
    );
  }
}

Button.defaultProps = {
  value: '',
  type: 'button',
};

Button.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
};


export default HOC(Button);
