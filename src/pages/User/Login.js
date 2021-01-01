//幾乎是直接複製貼上Register頁
import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'antd';
import { email_reg, pwd_reg } from '../../utils/Regexp.js';
import { connect } from 'dva';
import Request from '../../utils/Request';
import Logo from 'Assets/logo.jpg';
import style from './account.scss';

@connect()
class Login extends Component {
  componentDidMount() {
    Message.error('請輸入帳號與密碼',1) 
  }
  
  
  // 自定义表单校验规则，這是固定寫法。邏輯：比對用戶輸入的value是否符合我們定義的pattern
  validatorForm = (rule, value, callback) => {
    if (value && rule.pattern && !value.match(rule.pattern)) {
      callback(rule.message);
    } else {
      callback();
    }
  };
  // submit
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email, pwd } = values;
        Request('users.json').then(res => {
          //data is an object，其中的數據是以key:{user info}的方式儲存
          const { data, status } = res;
          if (res && status === 200 && data) {
            //声明一个陣列接收在server中儲存的的user info
            let users = [];
            for (const key in data) {             
              users.push({
                ...data[key],
                key:key
              });
            }
            // 将用户刚输入的帐密与server中回传的user info进行匹配
            //使用数组的filer方法，遍历每一项userInfo_object，找出密碼和email都相符的 项，然后赋值给新数组
            //处理好的新数组再覆盖users
            users = users.filter(user => {
              return user.pwd === pwd && user.email === email;
            });
          
            // 判断users下是否有内容，如果users有内容，而且有长度
            //代表是否server存有此用户的资料
            if (users && users.length) {
              // 存到localStorage
              localStorage.setItem('email', users[0].email);
              localStorage.setItem('key', users[0].key);
              localStorage.setItem('admin',users[0].admin)
              
              // 儲存到models里
              //装佩connect以后，dispatch()会存在于this.props中
              this.props.dispatch({
                  type: 'global/setUserInfo',//这个写法可以对应到model中的effect对象中的方法？？
                  payload: users[0]
              }).then(() => {
                  // 頁面跳轉到首頁
                  //??自动有history? 是的，應該是dva的原因                   
                  this.props.history.push('/');

                });
            } else {
              Message.error('帳號或密碼錯誤，請重新輸入');
            }
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={style.account}>
        <img src={Logo} alt="my logo" className={style.logo} />
        <Form className="account-form">
          <Form.Item label="帳號">
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: '請使用email作為您的帳號'
                },
                // {
                //   type: 'email',
                //   message: '請使用email作為您的帳號, 如: 27732357@qq.com'
                // }
                {
                  pattern: email_reg,
                  validator: this.validatorForm,
                  message: '請使用email作為您的帳號'
                }
              ]
              // initialValue: this.state.email
            })(<Input />)}
          </Form.Item>
          <Form.Item label="密碼">
            {getFieldDecorator('pwd', {
              rules: [
                {
                  required: true,
                  message: '密碼不能為空，請輸入密碼！'
                },
                {
                  pattern: pwd_reg,
                  validator: this.validatorForm,
                  message:
                    '請輸入正確的密碼格式：6-16位字母、數字或特殊字符: _-.'
                }
              ]
            })(
              <Input
                maxLength={16}
                type="password"
                placeholder="請輸入6-16位字母、數字或特殊字符的密碼"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button onClick={this.handleSubmit} className="btn" type="primary">
              登錄
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);
