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
  // 自定义表单校验规则，在getFieldDecorator中使用
  //validator方法應該是專門跟getFieldDecorator搭配使用，其中的rule, callback都不好直接理解是什麼，要打印出來才知道
  validatorForm = (rule, value, callback) => {
    if (value && rule.pattern && !value.match(rule.pattern)) {
      callback('sdsdsd'); //callback的參數不需要是rule.message，只要有值就會work，沒值就不會
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
    //this.props.form应该是Form.create hook up后产生的
    //validateFields理解成检验 表单输入格,values就是这个页面的表单提交信息
    this.props.form.validateFields((err, values) => {
      // console.log(err);
      if (!err) {
        //這邊的名稱是email, pwd，應該是下面getFieldDecorator設定的
        //從input取得用戶的email, pwd
        const { email, pwd } = values;
        // 发起网络请求，透过post方法，往url-users.json提交了数据，包含email,pwd信息
        Request('/users.json', {
          method: 'post',   //復寫了原本的method:'get'。所以封裝好的axios方法是可以直接復寫其內容的
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
          <Form.Item label="瓜瓜">
            {getFieldDecorator('email', {
              // input field規則設定
              rules: [//可以設定好幾組驗證規則
                {
                  required: true,
                  message: '信箱不能為空, 請輸入信箱',
                },
                {
                  pattern: email_reg, //使用正則校驗密碼格式
                  validator: this.validatorForm,
                  message: '請輸入正確的信箱格式,如: 123456@gmail.com'
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
