import React                from 'react';
import MUtil                from 'util/mm.jsx'
import Order                from 'service/order-service.jsx'
import PageTitle            from 'component/page-title/index.jsx';
import TableList            from 'util/table-list/index.jsx';

import './detail.scss';

const _mm           = new MUtil();
const _order        = new Order();

class OrderDetail extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      orderNumber : this.props.match.params.orderNumber,
      orderInfo: {}
    }
  }
  componentDidMount(){
    this.loadOrder();
  }
  // 发货操作
  onSendGoods(){
    if(window.confirm('是否确认该订单已经发货？')){
      _order.sendGoods(this.state.orderNumber).then((res) => {
        _mm.successTips('发货成功');
        this.loadOrderDetail();
    }, (errMsg) => {
        _mm.errorTips(errMsg);
      });
    }
  }
  // 加载商品详情
  loadOrder(){
    // 有id的时候，表示是编辑功能，需要表单回填
    _order.getOrderDetail(this.state.orderNumber).then((res) => {
      this.setState({
        orderInfo: res
      });
    }, (errMsg) => {
      _mm.errorTips(errMsg);
    });
  }
  render(){
    let receiverInfo = this.state.orderInfo.shippingVo || {};
    let productList = this.state.orderInfo.orderItemVoList || [];
    return (
      <div id="page-wrapper">
        <PageTitle title="订单详情" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">订单号</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.orderInfo.orderNo}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">创建时间</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.orderInfo.createTime}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">收件人</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {receiverInfo.receiverName}，
                {receiverInfo.receiverProvince}
                {receiverInfo.receiverCity}
                {receiverInfo.receiverAddress}
                {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">订单状态</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {this.state.orderInfo.statusDesc}
                {
                  this.state.orderInfo.status === 20
                  ? <button className="btn btn-default btn-sm btn-send-goods"
                      onClick={(e) => {this.onSendGoods(e)}}>立即发货</button>
                  : null
                }
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">支付方式</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {this.state.orderInfo.paymentTypeDesc}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">订单金额</label>
            <div className="col-md-5">
              <p className="form-control-static">
                ￥{this.state.orderInfo.payment}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品列表</label>
            <div className="col-md-10">
              <TableList tableHeads={['商品图片','商品信息','单价','数量','合计']}>
                {
                  productList.map((product, index)=>{
                    return (
                      <tr key={index}>
                        <td>
                          <img className="p-img" src={`${this.state.orderInfo.imageHost}${product.productImage}`} alt={product.name}/>
                        </td>
                        <td>{product.productName}</td>
                        <td>￥{product.currentUnitPrice}</td>
                        <td>{product.quantity}</td>
                        <td>{product.totalPrice}</td>
                      </tr>
                    )
                  })
                }
              </TableList>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default OrderDetail;