import React, { Component } from 'react';
import { Table, Button, Icon, Row, Col } from 'antd';
import Request from '../../utils/Request';
import style from './index.scss';

export default class index extends Component {
  state = {
    cart: [],
    menus: []
  };

  // 鉤子函數
  componentDidMount() {
    this.getMenusData();
  }

  // 獲取菜單列表的數據
  getMenusData = () => {
    Request('/menu.json').then(res => {

      if (res && res.status === 200 && res.data) {

        this.setState({
          menus: res.data //照這個寫法state_menus就從陣列變一個大object了
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
        render: (text, record) => {  //要看懂這段需要看documentations
          // console.log(record);
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
        render: (text, record) => {   //比照Admin.js，可以知道這一段是多餘的。text就是record.price的value
          return <span>{text}</span>;
        }
      },
      {
        key: 'action',
        title: '加入',
        render: (text, record) => { //render的概念就是最後要return 一段
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
      //查找目前cart中，是否已存在點擊'＋'的這一項數據      
      index >= 0
        ? cart.splice(index, 1, { //若cart_array中已經有點擊項，刪除原本的項，將原本的項的count+1，放回陣列
          ...cart[index],
          count: cart[index].count + 1
        })
        : (cart = [  //若cart中不存在點擊項，將陣列展開，然後加入新項，設定count:1
          ...cart,  //為什麼不直接cart.push推進陣列()，要用展開運算符 (我測試過push，app正常)
          {
            ...record,
            count: 1
          }
        ]);

      // 儲存到state
      this.setState({
        cart
      });
    };
    let data = this.state.menus;
    // 設計數據格式
    let dataSource = []; //dataSource需要陣列類型
    for (const key in data) {

      let item = data[key]; //取到每一筆資料，類型object
      dataSource.push({
        key: item.name,
        size: item.name
      });
      //先push品項行 
      item.options.forEach((ele, index) => { //forEach將陣列中的每一項遍歷，每一項是一個object
        dataSource.push({ ...ele, name: item.name, key: item.name + '-' + index });
        //
      });
    }
    console.log(dataSource);

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
        render: (text, record) => {  //參數的順序是固定的，text,record，寫反會報錯
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

    // 減
    const handleDecrease = record => {
      // cart 數據
      let { cart } = this.state;
      // 获取当前点击的数据的下标
      const index = cart.findIndex(item => item.key === record.key);
      // 当前点击的数据对象
      const current = cart[index];
      // 当前數量小于等于1时, 购物车的商品移除掉 否则商品數量减1
      if (current.count <= 1) {
        cart.splice(index, 1);
      } else {
        //cart[index].count-- 也會成功
        cart.splice(index, 1, {
          ...current,
          count: current.count - 1
        });
      }
      // 更新状态
      this.setState({
        cart
      });
    };

    // 加
    const handleIncrease = record => {
      // cart 数据
      let { cart } = this.state;
      // 获取当前点击的数据的下标
      const index = cart.findIndex(item => item.key === record.key);
      // 当前点击的数据对象
      const current = cart[index];
      //cart[index].count++  //我這個寫法就可以了，老師很愛用splice，why? 我當作練習閱讀別人程式碼
      // 商品數量+1
      cart.splice(index, 1, {
        ...current,
        count: current.count + 1
      });
      // 更新状态
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
