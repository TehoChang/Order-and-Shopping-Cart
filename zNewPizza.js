import React,{Component} from 'react'
import Request from './src/utils/Request'


class NewPizza extends Component{
  handleSubmit=()=>{
    this.props.form.validateFileds((err,value)=>{
      if(!err){

      }
    }
  }
}