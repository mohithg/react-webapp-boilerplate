import Formsy from 'formsy-react';

class Form extends React.Component {
  render() {
    return (
      <Formsy.Form
        onSubmit={this.props.onSubmit}
      >
        {this.props.children}
      </Formsy.Form>
    );
  }
}

Form.defaultProps = {
  onSubmit: () => { },
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
};

export default Form;
