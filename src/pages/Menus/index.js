import React, { Component } from 'react';
import { Table, Button, Icon, Row, Col } from 'antd';
import Request from '../../utils/Request';
import style from './index.scss';

export default class index extends Component {
  state = {
    cart: [],
    menus: []
  };

  componentDidMount() {
    this.getMenusData();
  }

  getMenusData = () => {
    Request('/menu.json').then(res => {
      if (res && res.status === 200 && res.data) {
        this.setState({
          menus: res.data 
        });
      }
    });
  };

  renderMenusTable() {
    const columns = [
      {
        key: 'size',
        title: '種類＆尺寸',
        dataIndex: 'size',
        render: (text, record) => {  
          if (record.price) {
            return <span>{text}</span>;
          }
          return {
            children: <strong>{text}</strong>,
            props: {
              colSpan: 2
            }
          };
        }
      },
      {
        key: 'price',
        title: '價格',
        dataIndex: 'price',
        render: (text, record) => {   
          return <span>{text}</span>;
        }
      },
      {
        key: 'action',
        title: '加入',
        render: (text, record) => { 
          const obj = {
            children: (
              <Button
                onClick={() => handleAddMenus(record)}
                className={style['add-btn']}
              >
                <Icon type="plus" />
              </Button>
            ),
            props: []
          };
          if (!record.price) {
            obj.props.colSpan = 0;
          }
          return obj;
        }
      }
    ];
    const handleAddMenus = record => {
      let { cart } = this.state;
      const index = cart.findIndex(item => item.key === record.key);
     
      index >= 0
        ? cart.splice(index, 1, { 
          ...cart[index],
          count: cart[index].count + 1
        })
        : (cart = [  
          ...cart,  
          {
            ...record,
            count: 1
          }
        ]);
      this.setState({
        cart
      });
    };
    let data = this.state.menus;
    let dataSource = []; 
    for (const key in data) {

      let item = data[key]; 
      dataSource.push({
        key: item.name,
        size: item.name
      });
      
      item.options.forEach((ele, index) => { 
        dataSource.push({ ...ele, name: item.name, key: item.name + '-' + index });
        
      });
    }
   

    return (
      <Table
        pagination={false}
        className="menus-table"
        dataSource={dataSource}
        columns={columns}
      />
    );
  }
  renderCartTable() {
    const columns = [
      {
        key: 'count',
        title: '數量',
        dataIndex: 'count',
        render: (text, record) => (
          <span>
            <Button
              onClick={() => handleDecrease(record)}
              className={style['cart-btn']}
            >
              -
            </Button>
            <span>{record.count}</span>
            <Button
              onClick={() => handleIncrease(record)}
              className={style['cart-btn']}
            >
              +
            </Button>
          </span>
        )
      },
      {
        key: 'name',
        title: '商品名稱',
        dataIndex: 'name',
        render: (text, record) => {  
          return <span>{`${record.name}, ${record.size}吋`}</span>
        }
      },
      {
        key: 'price',
        title: '價格',
        dataIndex: 'price',
        render: (text, record) => {
          return <span>{record.count * record.price}</span>
        }
      }
    ];

    
    const handleDecrease = record => {
      
      let { cart } = this.state;
      
      const index = cart.findIndex(item => item.key === record.key);
      
      const current = cart[index];
      
      if (current.count <= 1) {
        cart.splice(index, 1);
      } else {
        
        cart.splice(index, 1, {
          ...current,
          count: current.count - 1
        });
      }
      
      this.setState({
        cart
      });
    };

    
    const handleIncrease = record => {
      
      let { cart } = this.state;
      
      const index = cart.findIndex(item => item.key === record.key);
      
      const current = cart[index];
      
      
      cart.splice(index, 1, {
        ...current,
        count: current.count + 1
      });
      
      this.setState({
        cart
      });
    };

    return (
      <Table
        pagination={false}
        className="menus-table cart"
        dataSource={this.state.cart}
        columns={columns}
        locale={{
          emptyText: '購物車没有商品'
        }}
      />
    );
  }
  render() {
    const totalPrice = this.state.cart.reduce(
      (total, item) => {return total+ (item.price * item.count)},
      0
    );
    return (
      <Row>
        <Col sm={24} md={16}>
          {this.renderMenusTable()}
        </Col>
        <Col sm={24} md={8}>
          {this.renderCartTable()}
          <p className={style['total-price']}>總價: {totalPrice}</p>
          <Button type="primary" className={style['submit-btn']}>
            確認下單
          </Button>
        </Col>
      </Row>
    );
  }
}
