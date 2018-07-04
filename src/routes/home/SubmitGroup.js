import React from 'react';
import Proptypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';

// 防止重复提交
class SubmitGroup extends React.Component {
  static propTypes = {
    title: Proptypes.string.isRequired,
    onSubmit: Proptypes.func.isRequired,
    bsStyle: Proptypes.string,
    disabled: Proptypes.bool,
  };

  static defaultProps = {
    bsStyle: 'primary',
    disabled: false,
  };

  constructor(props) {
    super(props);

    this.loading = false;
    this.mount = false;
  }

  state = { disabled: false };

  componentWillMount() {
    this.setState({ disabled: this.props.disabled || this.loading });
  }

  componentDidMount() {
    this.mount = true;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ disabled: nextProps.disabled || this.loading });
  }

  componentWillUnmount() {
    this.mount = false;
  }

  handleClick() {
    this.loading = true;
    this.setState({ disabled: true });
    this.props.onSubmit().then(() => {
      this.loading = false;
      // 执行父级submit后，可能会unmount此类，这样本类setState后会产生错误
      if (this.mount) {
        this.setState({ disabled: false });
      }
    });
  }

  render() {
    const { disabled } = this.state;
    const { title, ...props } = this.props;
    return (
      <FormGroup className="text-center">
        <Button
          {...props}
          disabled={disabled}
          onClick={() => this.handleClick()}
        >
          {title}
        </Button>
      </FormGroup>
    );
  }
}

export default SubmitGroup;
