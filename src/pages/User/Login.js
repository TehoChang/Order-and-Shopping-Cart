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

  // 自定义校验两次密码是否一致
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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email, pwd } = values;
        Request('users.json').then(res => {
          // console.log(res);
          const { data, status } = res;
          if (res && status === 200 && data) {
            //声明一个数组接收在server中现存的user info
            let users = [];
            for (const key in data) {
              // console.log(data[key]);
              users.push({
                ...data[key],
                key
              });
            }
            
            // 将用户刚输入的帐密与server中回传的user info进行匹配
            //使用数组的filer方法，遍历每一项，找出密码和email都相符的 项，然后赋值给新数组
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
              Message.error('邮箱或密码错误, 请重新输入');
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
          <Form.Item label="邮箱">
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: '邮箱不能为空, 请输入邮箱'
                },
                // {
                //   type: 'email',
                //   message: '请输入正确的邮箱格式, 如: 27732357@qq.com'
                // }
                {
                  pattern: email_reg,
                  validator: this.validatorForm,
                  message: '请输入正确的邮箱格式,如: 27732357@qq.com'
                }
              ]
              // initialValue: this.state.email
            })(<Input />)}
          </Form.Item>
          <Form.Item label="密码">
            {getFieldDecorator('pwd', {
              rules: [
                {
                  required: true,
                  message: '密码不能为空，请输入密码！'
                },
                {
                  pattern: pwd_reg,
                  validator: this.validatorForm,
                  message:
                    '请输入正确的密码格式：6-16位字母、数字或特殊字符 _-.'
                }
              ]
            })(
              <Input
                maxLength={16}
                type="password"
                placeholder="请输入6-16位字母、数字或特殊字符的密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button onClick={this.handleSubmit} className="btn" type="primary">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(index);
