import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { XoaSP, suaSL, XoaGH } from "./cartSlice";
import { Link } from "react-router-dom";

function ShowCart(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.listSP);
  const TongTien = cart.reduce((tong, sp) => {
    return tong + sp.so_luong * sp.price;
  }, 0);


  const handleKeyPress = (event) => {
    // Chỉ cho phép nhập số dương và phím Backspace
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode <= 31 || (charCode >= 48 && charCode <= 57)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  };

  const handleBlur = (event, id) => {
    const value = event.target.value;
    if (value === "" || parseInt(value) <= 0) {
      event.target.value = 1;
      dispatch(suaSL([id, 1]));
    }
  };

  return (
    <div id="giohang">
      <h2 style={{marginTop:'10px'}}>Giỏ hàng của bạn</h2>

      {cart.length > 0 ? (
        <div>
          <table className="showcart">
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Ảnh</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((sp, index) => (
                <tr key={index}>
                  <td>{sp.name}</td>
                  <td>
                    <img src={sp.img} alt={sp.name} style={{ width: '150px', height: '150px' }} />
                  </td>
                  <td>{Number(sp.price).toLocaleString("vi")} VNĐ</td>
                  <td>
                    <input type="number" min={1} style={{width:'40px'}}  defaultValue={sp.so_luong} onChange={(e) => dispatch(suaSL([sp.id, parseInt(e.target.value)]))} onBlur={(e) =>{handleBlur(e, sp.id)}} onKeyPress={handleKeyPress}/>
                  </td>
                  <td><button className="tb_xoa" onClick={() => dispatch(XoaSP(sp.id))}>Xóa</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="tb_tt"><strong >Tổng tiền : </strong> {Number(TongTien).toLocaleString("vi")} VNĐ</div>
          <button onClick={() => dispatch(XoaGH())} className="tb_xoaall">
            Xóa tất cả 
          </button>
          <button className="tb_thanhtoan">
            <Link to="/thanhtoan" className="tb_thanhtoan_tt"> Thanh toán</Link>
          </button>
        </div>
      ) : (
        <div style={{height:'180px'}}>
          <p>Bạn chưa có sản phẩm nào trong giỏ hàng !</p>
        </div>
      )}
      
    </div>
  );
}

export default ShowCart;
