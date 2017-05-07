const Root = props => (
  <div className="root-outer-container">
    <div className="root-inner-container">
      {props.children}
    </div>
  </div>
);

Root.defaultProps = {
  children: (<div />),
};

Root.propTypes = {
  children: React.PropTypes.node,
};

export default Root;
