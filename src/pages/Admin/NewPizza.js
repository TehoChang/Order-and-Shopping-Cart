
//讀過去，程式碼都能看懂
import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'antd';
import Request from '../../utils/Request';

const { TextArea } = Input;

class NewPizza extends Component {
  handleSubmit = () => {
    // console.log(this.props.form);
    this.props.form.validateFields((err, value) => {
      // console.log(value);
      if (!err) {
        //antd Form用來獲取用戶輸入表單的數據
        const { name, description, size1, price1, size2, price2 } = value;
        //存到變量data。為什麼options是用array類型
        let data = {
          name,
          description,
          options: [
            {
              size: size1,
              price: price1
            },
            {
              size: size2,
              price: price2
            }
          ]
        };
        //將data提交到DBMS server
        Request('/menu.json', {
          method: 'post',
          data //data:data
        }).then(res => {
          if (res && res.status === 200 && res.data) {
            //Message是antd組件
            
            // window.location.href = '/#/menus'; //新增完成跳轉到菜單
            window.history.go(0) //google:瀏覽器 刷新頁面方法 javascript
                                 //這行程式碼會導致新增成功不顯示
            Message.success('新增成功');
          } else {
            Message.error('新增失敗');
          }
        });
      }
    });
  };
  render() {
    const formItemLayout = { //表單樣式，使用obj類型來設定
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 }
      },
      colon: false
    };
    const { getFieldDecorator } = this.props.form;
    const required = true;

    return (
      <div>
        <h3>訂製你最愛的蛋糕</h3>
        <Form>
          <Form.Item {...formItemLayout} label="種類">
            {getFieldDecorator('name', {
              rules: [ //rules是一個陣列
                {
                  required, //有required會出現紅色＊
                  message: '請輸入種類' //輸入提示
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="描述">
            {getFieldDecorator('description')(<TextArea />)}
            {/* //沒有任何的設定 */}
          </Form.Item>
          <p>
            <strong>選項1:</strong>
          </p>
          <Form.Item {...formItemLayout} label="尺寸">
            {getFieldDecorator('size1', {
              rules: [
                {
                  required,
                  message: '請輸入尺寸'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="價格">
            {getFieldDecorator('price1', {
              rules: [
                {
                  required,
                  message: '請輸入價格'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <p>
            <strong>選項2:</strong>
          </p>
          <Form.Item {...formItemLayout} label="尺寸">
            {getFieldDecorator('size2', {
              rules: [
                {
                  required,
                  message: '請輸入尺寸'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="價格">
            {getFieldDecorator('price2', {
              rules: [
                {
                  required,
                  message: '請輸入價格'
                }
              ]
            })(<Input />)}
          </Form.Item>

          <Form.Item>
            <Button
              onClick={this.handleSubmit}
              type="primary"
              className="btn-w-p100" //按鈕樣式
            >
              新增
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(NewPizza);
