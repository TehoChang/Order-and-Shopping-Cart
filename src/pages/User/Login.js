//跟Register的程式碼非常像
import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'antd';
import { email_reg, pwd_reg } from '../../utils/Regexp.js';
import { connect } from 'dva';
import Request from '../../utils/Request';
import Logo from 'Assets/logo.jpg';
import style from './account.scss';

@connect()
class index extends Component {
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
    //values是用戶輸入Form的帳號、密碼
    this.props.form.validateFields((err, values) => {
      if (!err) {
       

        const { email, pwd } = values; 
        Request('users.json').then(res => {
          // console.log(res);
          const { data, status } = res;
          if (res && status === 200 && data) { //若沒有這個條件判斷會怎麼樣?刪除後app正常，應該是為了更完善地檢查server res是否正常
            //宣告一个数组，接收在server中已經存在的user info
            let users = [];
            for (const key in data) {
              // console.log(data[key]);
              users.push({
                ...data[key],
                key
              });
            }
            // 将用户刚输入的帐密与server中回传的user info进行比較
            //使用数组的filer方法，遍历每一项，過濾出密碼和email都相符的 项，
            //然後用變數users接收返回的新數組，也就是密碼和email都相符的這一項           
            users = users.filter(user => {
              return user.pwd === pwd && user.email === email;
            });
            // 判断users現在是否有内容，如果users有内容，而且有长度
            // 代表是否server存有此用户的资料
            if (users && users.length) {
              // 存到localStorage
              localStorage.setItem('email', users[0].email);
              localStorage.setItem('key', users[0].key);

              // 存储到models里
              //装佩connect以后，dispatch()会存在于this.props中
              this.props.dispatch({
                  type: 'global/setUserInfo',//这个写法可以对应到model中的effect对象中的方法？？
                  payload: users[0]
              }).then(() => {
                  // 页面跳转
                  //??自动有history?     
                  this.props.history.push('/');

                });
            } else {
              Message.error('信箱或密碼錯誤，請重新輸入');
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
                  message: '請輸入正確的信箱格式'
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

export default Form.create()(index);
