import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import 'toastr/build/toastr.css';
import * as toastr from 'toastr';
import UpdateModal from '../UpdateModal/UpdateModal';
import { Button } from 'antd';

//员工信息的operation下的update button。
class UpdateButton extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, confirmLoading: false };
  }
  render() {
    const handleOk = values => {
      this.setState({
        confirmLoading: true
      });
      window.setTimeout(() => {
        this.setState({
          visible: false,
          confirmLoading: false
        });
        this.props.updateEmployee(values);
        toastr.success('Employee update success!');
      }, 2000);
    };
    const handleCancel = () => {
      this.setState({ visible: false });
      console.log(false);
    };

    const open = () => {
      this.setState({ visible: true });
    };

    return (
      <Fragment key={this.props.employee._id}>
        <Button type="default" onClick={open}>
          Update
        </Button>
        <UpdateModal
          visible={this.state.visible}
          handleCancel={handleCancel}
          handleOk={handleOk}
          employee={this.props.employee}
          confirmLoading={this.state.confirmLoading}
        />
      </Fragment>
    );
  }
}

UpdateButton.propTypes = {
  employee: PropTypes.object.isRequired,
  updateEmployee: PropTypes.func.isRequired
};

export default UpdateButton;
