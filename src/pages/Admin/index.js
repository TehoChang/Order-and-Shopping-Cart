import React, { Component } from 'react';
import { Table, Button, Row, Col, Message } from 'antd';
import Request from '../../utils/Request';
import NewPizza from './NewPizza';
import style from './index.scss';

export default class index extends Component {
  state = {
    menus:[]
  };


  componentDidMount() {
    this.getMenusData();
  }

 
  // 獲取菜單數據
  getMenusData = () => {

    Request('/menu.json').then(res => {//url就是新增菜單時的url
      // console.log(res);
      if (res && res.status === 200 && res.data) {
        const { data } = res;
        // 這段是進階語法，我看懂了
        // 一般setState寫法: setState({aaa:aaa}),直接改state obj裡面的key/value
        // 老師用的寫法是：setState的參數可以是回調函數，return obj就符合規則
        // 所以最後return {menus:menus}
        this.setState(() => {
          const menus = []; 
          for (const key in data) {
            menus.push({   
              key: key,
              name: data[key].name //name:用戶提交的商品名稱
            });
          }
          
          return { menus };
        });
      }
    });
  };

  renderMenuTable() {
    const columns = [ //<Table>的配置。columns的內容是一行一行的渲染（遍歷）
      {
        key: 'name',
        title: '種類',
        dataIndex: 'key' //他會去dataSource中找name。反正原理就是數據mapping來mapping去
      },
      {
        key: 'action',
        title: '刪除',
        render: (text, record) => (  //這個record代表table中的一條，應該是內建的參數
          <Button
            onClick={() => handleDelete(record)}
            className={style['del-btn']}
          >
            <span>X</span>
          </Button>
        )
      },
      {
        title:'3'  //配置m/4array 多一項，table就多一個colum
      }     
    ];

    const handleDelete = record => {
      Request(`/menu/${record.key}.json`, { //這個key是state.menus中的key
        method: 'delete'
      }).then(res => {
        // console.log(res);
        if (res && res.status === 200) {
          Message.success('刪除成功');
          // window.location.href = '/#/menus'; //目前的設計是跳轉回menus。要如何做到刷新頁面呢？state改變的話會刷新，
          window.history.go(0);
        } else {
          Message.error('刪除失败');
        }
      });
    };

    // const dataSource = [    //dataSource假數據是一個array of objects，看來<Table>的dataSource需要這種格式
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
           {this.renderNewPizza()}  {/*為什麼不直接寫<NewPizza/> */}
        </Col>
        <Col sm={24} md={8} className={style.right}>
          <h3>菜單</h3>
          {this.renderMenuTable()}
        </Col>
      </Row>
    );
  }
}
