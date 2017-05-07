import { HOC } from 'formsy-react';

class Text extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.setValue(event.target.value);
  }

  render() {
    return (
      <input
        type="text"
        onChange={this.onChange}
        name={this.props.name}
        value={this.props.getValue()}
      />
    );
  }
}

Text.propTypes = {
  name: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  getValue: PropTypes.func.isRequired,
};


export default HOC(Text);
