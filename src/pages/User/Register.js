import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'antd';
import { email_reg, pwd_reg } from '../../utils/Regexp.js';
import Request from '../../utils/Request';
import Logo from 'Assets/logo.jpg';
import style from './account.scss';

class index extends Component {
  state = {
    email: '123456@gmail.com'
  };
  
  validatorForm = (rule, value, callback) => {
    if (value && rule.pattern && !value.match(rule.pattern)) {
      callback(rule.message);
    } else {
      callback();
    }
  };
  
  
  validatorPwd = (rule, value, callback) => {
    if (value !== this.props.form.getFieldValue('pwd')) {
      callback(rule.message);
      return;
    }
    callback();
  };
  validatorAdmin=(rule, value, callback)=>{
    if (value !=='iamadmin'){
      callback(rule.message);
      return
    }else{
      callback()  
    }
  }

  
  handleSubmit = e => {
    e.preventDefault();
    
    
    this.props.form.validateFields((err, values) => {    
      if (!err) {
        const { email, pwd, admin } = values;
        
        Request('/users.json', {
          method: 'post',   
          data: { email, pwd, admin }
        }).then(res => {
          
          if (res.status === 200 && res.data) {
            Message.success('註冊成功',0.7)
            this.props.history.push('/login');
          }
        });
      }
    });
  };v

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
                  message: '請使用email作為您的帳號,如: 123456@gmail.com'
                }
              ]
              
            })(<Input />)} 
               {}
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
                    '請輸入正確的密碼格式：6-16位字母、數字或特殊字符 _-.'
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
          <Form.Item label="確認密碼">
            {getFieldDecorator('aPwd', {
              rules: [
                {
                  required: true,
                  message: '請輸入確認密碼！'
                },
                {
                  pattern: pwd_reg,
                  validator: this.validatorForm,
                  message:
                    '請輸入正確的密碼格式：6-16位字母、數字或特殊字符 _-.'
                },
                
                {
                  validator: this.validatorPwd,
                  message: '兩次輸入的密碼不一致！'
                }
              ]
            })(
              <Input
                maxLength={16}
                type="password"
                placeholder="請輸入確認密碼"
              />
            )}
          </Form.Item>
          <Form.Item label="管理員密碼">
            {getFieldDecorator('admin',{
              
              
              
              
              
              
            })(
              <Input                
                placeholder="若您不是管理員，請忽略"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button onClick={this.handleSubmit} className="btn" type="primary">
              註冊
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(index);
