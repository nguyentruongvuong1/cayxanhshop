import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Headers from './Header';
import Main from './Main';
import ShowdetalPr from './Prdetail';
import ShowPrbyCate from './Prbycate';
import ShowCart from './cart';
import Thanhtoan from './Thanhtoan';
import FormLogin from './Login';
import Showsplike from './PrLike';
function App() {
  return (
    <BrowserRouter basename='/'>
      <Headers />
      <main>
   <Routes>
  <Route path='/' element={<Main/>} />
  <Route path='/sp/:id' element={<ShowdetalPr/>} />
  <Route path='/cate/:id_loai' element={<ShowPrbyCate/>} />
  <Route path='/splike/' element={<Showsplike/>} />
  <Route path='/cart' element={<ShowCart/>} />
  <Route path='/thanhtoan' element={<Thanhtoan/>} />
  <Route path='/login' element={<FormLogin/>} />

   </Routes>
   </main>
   <footer>
    <div class="footer-main">
        <div class="footer-logo">
            <img src="/logo.png" alt=""/>
            <p>VƯƠNG TREES SHOP mong mang đến không gian sống xanh, như là một cách để khơi nguồn cảm hứng, cải thiện chất lượng tinh thần tươi và đồng thời còn mang lại tính thẩm mỹ cho không gian nội thất.</p>
        </div>
  
        <div class="footer-vct">
            <h5>VỀ CHÚNG TÔI</h5>
            <Link>Giới thiệu</Link>
            <Link>Liên hệ</Link>
            <Link>Chính sách bảo mật</Link>
            <Link>Chính sách bảo hành </Link>
            <Link>Phương thức thanh toán</Link>
            <Link>Phương thức vận chuyển</Link>
        </div>
  
        <div class="footer-vct">
            <h5>LIÊN HỆ</h5>
            <p>Hotline 1: 0123456789</p>
            <p>Hotline 2: 0987654321</p>
            <p>Hotline 3: 0364185395</p>
            <p>Gmail: nguyentruongvuong11&#64;gmail.com</p>
            <p>Địa chỉ: Tân Thới Hiệp QUận 12</p>
        </div >
        
        <div class="footer-vct">
            <h5>PHƯƠNG THỨC  THANH TOÁN</h5>
            <p>Hotline 1: 0123456789</p>
            <p>Hotline 2: 0987654321</p>
            <p>Hotline 3: 0364185395</p>
            <p>Gmail: nguyentruongvuong11&#64;gmail.com</p>
            <p>Địa chỉ: Tân Thới Hiệp QUận 12</p>
        </div>
  
    </div>    
  
    </footer>
    </BrowserRouter>
  );
}

export default App;
