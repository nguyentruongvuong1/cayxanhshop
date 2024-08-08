import './App.css';
import {  Link} from 'react-router-dom';
import Headers from './Header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <Headers />
      <main>
    <Outlet/>
   </main>
   <div style={{ border:'1px solid #FCF9F3', height:'20px',backgroundColor:'#FCF9F3'}}></div>
   <footer>
    <div className="footer-main">
        <div className="footer-logo">
            <img src="/logo.png" alt=""/>
            <p>VƯƠNG TREES SHOP mong mang đến không gian sống xanh, như là một cách để khơi nguồn cảm hứng, cải thiện chất lượng tinh thần tươi và đồng thời còn mang lại tính thẩm mỹ cho không gian nội thất.</p>
        </div>
  
        <div className="footer-vct">
            <h5>VỀ CHÚNG TÔI</h5>
            <Link>Giới thiệu</Link>
            <Link>Liên hệ</Link>
            <Link>Chính sách bảo mật</Link>
            <Link>Chính sách bảo hành </Link>
            <Link>Phương thức thanh toán</Link>
            <Link>Phương thức vận chuyển</Link>
        </div>
  
        <div className="footer-vct">
            <h5>LIÊN HỆ</h5>
            <p>Hotline 1: 0123456789</p>
            <p>Hotline 2: 0987654321</p>
            <p>Hotline 3: 0364185395</p>
            <p>Gmail: nguyentruongvuong11&#64;gmail.com</p>
            <p>Địa chỉ: Tân Thới Hiệp QUận 12</p>
        </div >
        
        <div className="footer-vct">
            <h5>PHƯƠNG THỨC  THANH TOÁN</h5>
            <p>Hotline 1: 0123456789</p>
            <p>Hotline 2: 0987654321</p>
            <p>Hotline 3: 0364185395</p>
            <p>Gmail: nguyentruongvuong11&#64;gmail.com</p>
            <p>Địa chỉ: Tân Thới Hiệp QUận 12</p>
        </div>
    
    
    </div>    

    <div>
      <h2>BẢN ĐỒ</h2>
      <hr />
      <iframe
        title="Google Maps Embed"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4436614899205!2d106.6252534745119!3d10.85382108929969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bee0b0ef9e5%3A0x5b4da59e47aa97a8!2zQ8O0bmcgVmnDqm4gUGjhuqduIE3hu4FtIFF1YW5nIFRydW5n!5e0!3m2!1svi!2s!4v1684984988242!5m2!1svi!2s"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        frameBorder="0"
      ></iframe>
    </div>
  
    </footer>
    </div>
  );
}

export default App;
