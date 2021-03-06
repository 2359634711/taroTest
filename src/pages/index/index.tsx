import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import { connect } from 'react-redux'
import './index.scss'

import { add, minus, asyncAdd } from '../../actions/counter'

interface IProps {
  add?: () => void;
  dec?: () => void;
  asyncAdd?: () => void;
  counter?:{
    num:number
  }
}
@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  },
  dec() {
    dispatch(minus())
  },
  asyncAdd() {
    dispatch(asyncAdd())
  }
}))
class Index extends Component<IProps, object> {
  config = {
    navigationBarTitleText: '首页'
  }

  render() {
    return (
      <View className='todo'>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View>{this.props.counter ? this.props.counter.num: '0'}</View>
      </View>
    )
  }
}


export default Index