import React, { Component } from 'react';
import { Table, Button, Row, Col, Message } from 'antd';
import Request from '../../utils/Request';
import NewPizza from './NewCake';
import style from './index.scss';

export default class index extends Component {
  state = {
    menus: [] //用"陣列"儲存數據
  };


  componentDidMount() {
    this.getMenusData();
  }

  獲取菜單列表的數據
  getMenusData = () => {
    Request('/menu.json').then(res => {
      // console.log(res);
      if (res && res.status === 200 && res.data) {
        const { data } = res;
        //setState()可以接收函數作為參數，最後返回要改變的數據：menus
        //等於setState({menus:menus})
        this.setState(() => {
          const menus = [];
          for (const key in data) {

            menus.push({
              key: key, //key是firebase幫我增加的
              name: data[key].name,
              sizeOptions: `${data[key].options[0].size} ${(data[key].options[1])?','+data[key].options[1].size : ''}`

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
        render: (text, record) => (  //record一條是dataSource_array中的一項。
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
      Request(`/menu/${record.key}.json`, {  // /menu/key.json 可以在firebase server選中某一項數據
        method: 'delete'
      }).then(res => {
        // console.log(res);
        if (res && res.status === 200) {
          Message.success('刪除成功',2);
          window.history.go(0);
          
        } else {
          Message.error('刪除失败');
        }
      });
    };

    // const dataSource = [
    //   {
    //     key: 1,
    //     name: 'pizza'
    //   }
    // ];

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

  renderNewPizza() {
    return <NewPizza />;
  }

  render() {
    return (
      <Row className={style.admin}>
        <Col sm={24} md={16} className={style.left}>
          {this.renderNewPizza()}  
        </Col>
        <Col sm={24} md={8} className={style.right}>
          <h3>菜單</h3>
          {this.renderMenuTable()}
        </Col>
      </Row>
    );
  }
}
