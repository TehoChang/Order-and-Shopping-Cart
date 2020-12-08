import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { email_reg, pwd_reg } from '../../utils/Regexp.js';
import Request from '../../utils/Request';
import Logo from 'Assets/logo.jpg';
import style from './account.scss';

class index extends Component {
  state = {
    email: '27732357000@qq.com'
  };
  // 自定义表单校验规则
  validatorForm = (rule, value, callback) => {
    if (value && rule.pattern && !value.match(rule.pattern)) {
      callback(rule.message);
    } else {
      callback();
    }
  };

  // 自定义校验兩次密碼是否一致
  validatorPwd = (rule, value, callback) => {
    if (value !== this.props.form.getFieldValue('pwd')) {
      callback(rule.message);
      return;
    }
    callback();
  };

  // submit
  handleSubmit = e => {
    e.preventDefault();
    //this.props.form应该是Form.createhook up后产生的
    //validateFields理解成检验 表单输入格,values就是这个页面的表单提交信息
    this.props.form.validateFields((err, values) => {
      // console.log(err);
      if (!err) {
        const { email, pwd } = values;
        // 发起网络请求，透过post方法，就往url-users.json提交了数据，包含email,pwd
        Request('/users.json', {
          method: 'post',   //复写了原本的method:'get'
          data: { email, pwd }
        }).then(res => {
          // console.log(res);打印看看res的结构
          if (res.status === 200 && res.data) {
            // console.log(this.props.history);
            this.props.history.push('/login');
          }
        });
      }
    });
  };

  render() {
                               //使用Form.Create后产生
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={style.account}>
        <img src={Logo} alt="my logo" className={style.logo} />
        <Form className="account-form">
          <Form.Item label="信箱">
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: '信箱不能為空, 請輸入信箱'
                },
                // {
                //   type: 'email',
                //   message: '請輸入正確的信箱格式, 如: 27732357@qq.com'
                // }
                {
                  pattern: email_reg,
                  validator: this.validatorForm,
                  message: '請輸入正確的信箱格式,如: 27732357@qq.com'
                }
              ]
              // initialValue: this.state.email
            })(<Input />)} 
               {/* 跟Input绑定 */}
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
                  message: '密碼不能為空，請輸入密碼！'
                },
                {
                  pattern: pwd_reg,
                  validator: this.validatorForm,
                  message:
                    '請輸入正確的密碼格式：6-16位字母、數字或特殊字符 _-.'
                },
                {
                  validator: this.validatorPwd,
                  message: '兩次输入的密碼不一致！'
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
