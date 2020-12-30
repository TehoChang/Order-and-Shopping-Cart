import React,{Component} from 'react'
import Request from './src/utils/Request'


class NewPizza extends Component{
  handleSubmit=()=>{
    this.props.form.validateFileds((err,value)=>{
      if(!err){
        const{}=value
        const { name, description, size1, price1, size2, price2 } = value;
        let data={
          name,
          description,
          options:[
            {
            size:size1,
            price:price1
            },
            {
            size:size2,
            price:price2
            }
          ]
        }
        Request('/menus.json',{
          method:'post',
          data
        })
      }
    }
  
}
}
  
