
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
  
  
  
  validatorForm = (rule, value, callback) => {
    if (value && rule.pattern && !value.match(rule.pattern)) {
      callback(rule.message);
    } else {
      callback();
    }
  };
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email, pwd } = values;
        Request('users.json').then(res => {
          
          const { data, status } = res;
          if (res && status === 200 && data) {
            
            let users = [];
            for (const key in data) {             
              users.push({
                ...data[key],
                key:key
              });
            }
            
            
            
            users = users.filter(user => {
              return user.pwd === pwd && user.email === email;
            });
          
            
            
            if (users && users.length) {
              
              localStorage.setItem('email', users[0].email);
              localStorage.setItem('key', users[0].key);
              localStorage.setItem('admin',users[0].admin)
              
              
              
              this.props.dispatch({
                  type: 'global/setUserInfo',
                  payload: users[0]
              }).then(() => {
                  
                  
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
                
                
                
                
                {
                  pattern: email_reg,
                  validator: this.validatorForm,
                  message: '請使用email作為您的帳號'
                }
              ]
              
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
