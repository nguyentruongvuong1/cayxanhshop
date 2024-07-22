import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
function Headers() {
  return (
    <header className="header-index">
      <div className="header-logo">
        <Link to={"/"}>
          <img width="200px" height="200px" src="/logo.png" alt="logo" />
        </Link>
      </div>

      <div className="hiencaytrongnha">
        <div className="header-link">
          <Link>Cây trong nhà</Link>
        </div>

        <div className="header-menucon">
          <div className="theokieudang">
            <h5>Theo kiểu dáng</h5>
            <Link><p>Cây Cao & Lớn</p></Link>
            <Link><p>Cây Cảnh Mini</p></Link>
            <Link><p>Cây reo Trong Nhà</p></Link>
            <Link><p>Cây Nhiệt Đới</p></Link>
            <Link><p>Cây Kiểng Lá</p></Link>
          </div>

          <div className="theovitri">
            <h5>Theo vị trí đặt</h5>
            <Link><p>Cây Cảnh Dể Bàn</p></Link>
            <Link><p>Cây Cảnh Văn Phòng</p></Link>
            <Link><p>Cây Trong Bếp & Nhà Tắm</p></Link>
            <Link><p>Cây Trước Cửa & Hành Lang</p></Link>
            <Link><p>Cây Trồng ban Công</p></Link>
          </div>

          <div className="theochucnang">
            <h5>Theo chức năng</h5>
            <Link><p>Cây Dễ Trồng</p></Link>
            <Link><p>Cây Ít Cần Ánh Sáng</p></Link>
            <Link><p>Cây Thủy Sinh</p></Link>
            <Link><p>Cây Phong Thủy</p></Link>
            <Link><p>Cây Lọc Không Khí</p></Link>
          </div>

          <div>
            <img src="/caytrongnha.jpg" alt="caytrongnha" />
          </div>
        </div>
      </div>

      <div className="hiencaytrongnha">
        <div className="header-link">
          <Link>Cây ngoài trời</Link>
        </div>

        <div className="header-menucon">
          <div className="theokieudang">
            <h5>Theo kiểu dáng</h5>
            <Link><p>Cây Tầm Trung</p></Link>
            <Link><p>Cây Cảnh Mini</p></Link>
            <Link><p>Cây reo Trong Nhà</p></Link>
            <Link><p>Cây Nhiệt Đới</p></Link>
            <Link><p>Cây Kiểng Lá</p></Link>
          </div>

          <div className="theovitri">
            <h5>Theo vị trí đặt</h5>
            <Link><p>Cây Cảnh Dể Bàn</p></Link>
            <Link><p>Cây Cảnh Văn Phòng</p></Link>
            <Link><p>Cây Trong Bếp & Nhà Tắm</p></Link>
            <Link><p>Cây Trước Cửa & Hành Lang</p></Link>
            <Link><p>Cây Trồng ban Công</p></Link>
          </div>

          <div className="theochucnang">
            <h5>Theo chức năng</h5>
            <Link><p>Cây Dễ Trồng</p></Link>
            <Link><p>Cây Ít Cần Ánh Sáng</p></Link>
            <Link><p>Cây Thủy Sinh</p></Link>
            <Link><p>Cây Phong Thủy</p></Link>
            <Link><p>Cây Lọc Không Khí</p></Link>
          </div>

          <div>
            <img src="/caytrongnha.jpg" alt="caytrongnha" />
          </div>
        </div>
      </div>

      <div className="hiencaytrongnha">
        <div className="header-link">
          <Link>Chậu cây</Link>
        </div>

        <div className="header-menucon">
          <div className="theokieudang">
            <h5>Theo kiểu dáng</h5>
            <Link><p>Cây Cao & Lớn</p></Link>
            <Link><p>Cây Cảnh Mini</p></Link>
            <Link><p>Cây reo Trong Nhà</p></Link>
            <Link><p>Cây Nhiệt Đới</p></Link>
            <Link><p>Cây Kiểng Lá</p></Link>
          </div>

          <div className="theovitri">
            <h5>Theo vị trí đặt</h5>
            <Link><p>Cây Cảnh Dể Bàn</p></Link>
            <Link><p>Cây Cảnh Văn Phòng</p></Link>
            <Link><p>Cây Trong Bếp & Nhà Tắm</p></Link>
            <Link><p>Cây Trước Cửa & Hành Lang</p></Link>
            <Link><p>Cây Trồng ban Công</p></Link>
          </div>

          <div className="theochucnang">
            <h5>Theo chức năng</h5>
            <Link><p>Cây Dễ Trồng</p></Link>
            <Link><p>Cây Ít Cần Ánh Sáng</p></Link>
            <Link><p>Cây Thủy Sinh</p></Link>
            <Link><p>Cây Phong Thủy</p></Link>
            <Link><p>Cây Lọc Không Khí</p></Link>
          </div>

          <div>
            <img src="/caytrongnha.jpg" alt="caytrongnha" />
          </div>
        </div>
      </div>

      <div className="hiencaytrongnha">
        <div className="header-link">
          <Link>Phụ kiện</Link>
        </div>

        <div className="header-menucon">
          <div className="theokieudang">
            <h5>Theo kiểu dáng</h5>
            <Link><p>Cây Cao & Lớn</p></Link>
            <Link><p>Cây Cảnh Mini</p></Link>
            <Link><p>Cây reo Trong Nhà</p></Link>
            <Link><p>Cây Nhiệt Đới</p></Link>
            <Link><p>Cây Kiểng Lá</p></Link>
          </div>

          <div className="theovitri">
            <h5>Theo vị trí đặt</h5>
            <Link><p>Cây Cảnh Dể Bàn</p></Link>
            <Link><p>Cây Cảnh Văn Phòng</p></Link>
            <Link><p>Cây Trong Bếp & Nhà Tắm</p></Link>
            <Link ><p>Cây Trước Cửa & Hành Lang</p></Link>
            <Link><p>Cây Trồng ban Công</p></Link>
          </div>

          <div className="theochucnang">
            <h5>Theo chức năng</h5>
            <Link><p>Cây Dễ Trồng</p></Link>
            <Link><p>Cây Ít Cần Ánh Sáng</p></Link>
            <Link><p>Cây Thủy Sinh</p></Link>
            <Link><p>Cây Phong Thủy</p></Link>
            <Link><p>Cây Lọc Không Khí</p></Link>
          </div>

          <div>
            <img src="/caytrongnha.jpg" alt="caytrongnha" />
          </div>
        </div>
      </div>

      <div className="hiencaytrongnha">
        <div className="header-link">
          <Link>Hướng dẫn</Link>
        </div>

        <div className="header-menucon">
          <div className="theokieudang">
            <h5>Theo kiểu dáng</h5>
            <Link><p>Cây Cao & Lớn</p></Link>
            <Link><p>Cây Cảnh Mini</p></Link>
            <Link><p>Cây reo Trong Nhà</p></Link>
            <Link><p>Cây Nhiệt Đới</p></Link>
            <Link><p>Cây Kiểng Lá</p></Link>
          </div>

          <div className="theovitri">
            <h5>Theo vị trí đặt</h5>
            <Link><p>Cây Cảnh Dể Bàn</p></Link>
            <Link><p>Cây Cảnh Văn Phòng</p></Link>
            <Link><p>Cây Trong Bếp & Nhà Tắm</p></Link>
            <Link><p>Cây Trước Cửa & Hành Lang</p></Link>
            <Link><p>Cây Trồng ban Công</p></Link>
          </div>

          <div className="theochucnang">
            <h5>Theo chức năng</h5>
            <Link><p>Cây Dễ Trồng</p></Link>
            <Link><p>Cây Ít Cần Ánh Sáng</p></Link>
            <Link><p>Cây Thủy Sinh</p></Link>
            <Link><p>Cây Phong Thủy</p></Link>
            <Link><p>Cây Lọc Không Khí</p></Link>
          </div>

          <div>
            <img src="/caytrongnha.jpg" alt="caytrongnha" />
          </div>
        </div>
      </div>

      <div className="main_cart">
        <Link to="/cart" style={{color:'black'}}>
         <FontAwesomeIcon icon={faCartShopping} style={{width:'40px'}} />
        </Link>
      </div>


      <div className="main_user">
        <FontAwesomeIcon icon={faUser} style={{height:"35px"}} />
        <div className="main_user_an">
          <div className="main_user_dn">
            <Link to="/login">Đăng nhập</Link>
          </div>
          <div className="main_user_dk">
            <Link to="/register">Đăng kí</Link>
          </div>
        </div>
      </div>

    </header>
    
  );
}

export default Headers;
