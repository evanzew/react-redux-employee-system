import React, { Component } from 'react';
import './EmployeeItem.scss';
import PropTypes from 'prop-types';
import DeleteButton from '../../containers/DeleteButton/DeleteButton';
import UpdateButton from '../../containers/UpdateButton/UpdateButton';
import { Button, Col, Table } from 'antd';
const ButtonGroup = Button.Group;

//员工信息table，并分页。
class EmployeeItem extends Component {
  constructor() {
    super();
    this.state = {
      filteredInfo: null,
      sortedInfo: null
    };
  }
  render() {
    const handleChange = (pagination, filters, sorter) => {
      this.setState({
        filteredInfo: filters,
        sortedInfo: sorter
      });
      sorter.columnKey === 'First_Name'
        ? sorter.order == 'ascend'
          ? this.props.sortByFN(true)
          : this.props.sortByFN(false)
        : sorter.order == 'ascend'
        ? this.props.sortByLN(true)
        : this.props.sortByLN(false);
    };
    let pagination = {
      pageSize: 5,
      total: this.props.pages * 5,
      hideOnSinglePage: true,
      current: this.props.index,
      onChange: page => {
        this.props.changeIndex(page);
      }
    };
    const columns = [
      {
        title: 'First Name',
        dataIndex: 'First_Name',
        key: 'First_Name',
        width: 140,
        sorter: (a, b) => {
          a.First_Name - b.First_Name;
        }
      },
      {
        title: 'Last Name',
        dataIndex: 'Last_Name',
        key: 'Last_Name',
        width: 140,
        sorter: (a, b) => {
          a.Last_Name - b.Last_Name;
        }
      },
      {
        title: 'Gender',
        dataIndex: 'Gender',
        key: 'Gender',
        width: 100
      },
      {
        title: 'Birth',
        dataIndex: 'Birth',
        key: 'Birth',
        width: 130
      },
      {
        title: 'Address',
        dataIndex: 'Address',
        key: 'Address'
      },
      {
        title: 'Phone',
        dataIndex: 'Phone',
        key: 'Phone',
        width: 150
      },
      {
        title: 'Operation',
        key: 'Operation',
        dataIndex: 'Operation',
        width: 200,
        render: (text, record) => (
          <ButtonGroup>
            <DeleteButton id={record._id} />
            <UpdateButton employee={record} />
          </ButtonGroup>
        )
      }
    ];
    const data = [];
    this.props.employees.forEach((employee, index) => {
      data.push({
        key: index,
        ...employee
      });
    });
    return (
      <Col xs={24}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={pagination}
          onChange={handleChange}
        />
      </Col>
    );
  }
}

EmployeeItem.propTypes = {
  employees: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  changeIndex: PropTypes.func.isRequired
};

export default EmployeeItem;
