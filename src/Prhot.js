import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Showsphot() {
  const [listsp, ganlistsp] = useState([]);
  const [color, gancolor] = useState('white');

  useEffect(() => {
    let url = "http://localhost:3000/sphot";
    fetch(url)
      .then((res) => res.json())
      .then((data) => ganlistsp(data));
  }, []);

  const tangluotxem = (id) => {
    let url = `http://localhost:3000/tangluotxem/${id}`;
    let opt = {
      method: 'post',
      body: JSON.stringify({}),
      headers: { "Content-Type": 'application/json' },
    };
    fetch(url, opt)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const tim = () => {
    gancolor(color === 'white' ? 'red' : 'white');
  };

  return (
    <div id="listnewpr" className="main-product">
      <h3 style={{ marginBottom: '20px' }}>SẢN PHẨM HOT</h3>
      <div className="pr">
        {listsp.map((p, index) => (
          <div className="product" key={index}>
            <div className="product-con">
              <p className="product_moi">Hot</p>
              <Link to={"sp/" + p.id} onClick={() => tangluotxem(p.id)}>
                <img src={p.img} alt={p.name} />
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill={color}
                className="bi bi-heart-fill"
                viewBox="0 0 16 16"
                onClick={() => tim()}
                cursor={'pointer'}
              >
                <path
                  fillRule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                />
              </svg>
              <button className="product-mn" onClick={() => tangluotxem(p.id)}>
                <Link to={"sp/" + p.id} className="xct">Xem chi tiết</Link>
              </button>
            </div>
            <div className="product-name-price">
              <p className="product-name">{p.name.toLocaleUpperCase()}</p>
              <p>{Number(p.price).toLocaleString('vi')} VNĐ</p>
              <p>Lượt xem : {p.xem}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Showsphot;
