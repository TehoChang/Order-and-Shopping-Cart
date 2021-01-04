import React, { Component } from 'react';
import { Table, Button, Row, Col, Message } from 'antd';
import Request from '../../utils/Request';
import NewCake from './NewCake';
import style from './index.scss';

export default class index extends Component {
  state = {
    menus: []
  };

  componentDidMount() {
    this.getMenusData();
  }

  getMenusData = () => {
    Request('/menu.json').then(res => {
      if (res && res.status === 200 && res.data) {
        const { data } = res;
        this.setState(() => {
          const menus = [];
          for (const key in data) {
            menus.push({
              key: key,
              name: data[key].name,
              sizeOptions: `${data[key].options[0].size} ${(data[key].options[1]) ? ',' + data[key].options[1].size : ''}`
            });
          }
          return { menus };
        });
      }
    });
  };

  renderMenuTable() {
    const columns = [
      {
        key: 'name',
        title: '種類',
        dataIndex: 'name'
      },
      {
        key: 'sizeOptions',
        title: '尺寸選擇',
        dataIndex: 'sizeOptions'
      },
      {
        key: 'action',
        title: '刪除',
        render: (text, record) => ( 
          <Button
            onClick={() => handleDelete(record)}
            className={style['del-btn']}
          >
            <span>x</span>
          </Button>
        )
      }
    ];

    const handleDelete = record => {
      Request(`/menu/${record.key}.json`, {  
        method: 'delete'
      }).then(res => {
        if (res && res.status === 200) {
          Message.success('刪除成功', 2);
          window.history.go(0);
        } else {
          Message.error('刪除失败');
        }
      });
    };

    return (
      <Table
        pagination={false}
        className="menus-table"
        dataSource={this.state.menus}
        columns={columns}
        locale={{
          emptyText: '菜單沒有商品'
        }}
      />
    );
  }

  rendernewCake() {
    return <NewCake />;
  }

  render() {
    return (
      <Row className={style.admin}>
        <Col sm={24} md={16} className={style.left}>
          {this.rendernewCake()}
        </Col>
        <Col sm={24} md={8} className={style.right}>
          <h3>菜單</h3>
          {this.renderMenuTable()}
        </Col>
      </Row>
    );
  }
}
