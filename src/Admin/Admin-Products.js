import { useState, useEffect } from "react"
import { PaginationControl } from "react-bootstrap-pagination-control"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";

function AdminPr() {
  
    const [pr, setpr] = useState([]);
    const [Cate, setCate] = useState([]);
    const [page, setpage] = useState(1);
    const [allPr, setallPr] = useState([])
    const [totalrow, settotalrow] = useState(0);
    const limit = 4;
    const [search, setsearch] = useState('');
    const [spfilter, ganspfilter] = useState([])

    const token = useSelector(state => state.auth.token)
   
    
    useEffect(() =>{
      let opt = {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
        fetch(`http://localhost:3000/admin/sp/dem`, opt).then(res => res.json()).then(data => {
            if(data.total !== undefined){
                settotalrow(data.total)
            }else{
                console.error("Invalid data structure for total rows", data);
            }
        })
        fetch(`http://localhost:3000/admin/sp?page=${page}&limit=${limit}`, opt).then(res => res.json()).then(data => setpr(data)
      )
        fetch(`http://localhost:3000/admin/cate`, opt).then(res => res.json()).then(data => setCate(data));
        
        fetch(`http://localhost:3000/sp`).then(res => res.json()).then(data => setallPr(data))
    }, [page, token])

    const onchangeSearch = (e) =>{
      setsearch(e.target.value)
    }

    useEffect(() =>{
      if(search === ''){
        ganspfilter(pr)
      }else{
        const FilterPr = allPr.filter( sp => sp.name.toLowerCase().includes(search.toLowerCase()))
        ganspfilter(FilterPr)
      }
      
      
      
    },[search, allPr, pr])

    

    const nameCate = (id_loai) =>{
        let cate = Cate.find(l => l.id === id_loai)
        return cate ? cate.name : 'Không xác định'
    }

    const formatDate = (ngay) => {
      const date = new Date(ngay);
      return date.toLocaleDateString('vi-VN'); // Định dạng ngày theo kiểu Việt Nam
  };


  const DeletePr = (id) =>{
    const hoi = window.confirm('Bạn có chắc muốn xóa sản phẩm này không');
    if(hoi){
      let opt = {method:'DELETE', headers:{'Content-Type':'application/json', 'Authorization': 'Bearer ' + token}}
      fetch(`http://localhost:3000/admin/sp/${id}`,opt).then(res => res.json()).then(data =>{
        alert('Bạn đã xóa sản phẩm thành công')
        window.location.reload();
      })
    }else window.location.reload();
      
      
  }

  const AHpr = (id, value) =>{
    let url = `http://localhost:3000/admin/spAH/${id}`
    let tt = {an_hien: value};
    let opt = {method: 'POST', body:JSON.stringify(tt), headers:{"Content-Type":'application/json', 'Authorization': 'Bearer ' + token}}

    fetch(url, opt).then(res => res.json()).then(data =>{
      if(value === 1){
        alert("Bạn đã ẩn sản phẩm")
        window.location.reload()
      }else{
        alert("Bạn đã hiện sản phẩm")
        window.location.reload()

      }
    })

  }

    return(
      
<div>
  
<div className="link_dashboard">
    <p> <strong>Home </strong></p>
    <p>/</p>
    <p style={{color: "#00791c"}}><Link href="#" to={'/admin'}> Dashboard</Link></p>
    <p>/</p>
    <p ><Link href="#" to={'/admin/products'}> Sản phẩm</Link></p>
</div>
  <Link href="#" className="btn-add-product" to={"/admin/addpr"}>Thêm sản phẩm</Link>

  <div className="search">
        <input
            type="text"
            value={search}
            onChange={onchangeSearch} placeholder="Tìm kiếm..."
           
/>
        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon_search" />
  </div>
  <div>
    <table className="table-products">
      <tbody>
        <tr>
          <th>Tên sản phẩm</th>
          <th>Ảnh sản phẩm</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Danh mục</th>
          <th>Ngày</th>
          <th>Ẩn hiện</th>
          <th>Chức năng</th>
        </tr>
        {
         spfilter.length > 0 ? ( spfilter.map(sp =>
            <tr key={sp.id}>
              <td>{sp.name}</td>
              <td>
                <img height="150px" width="150px" src={sp.img.startsWith('./public/Images') ? `http://localhost:3000/${sp.img}` :sp.img  } alt={sp.name} />
                </td>
              <td>{Number(sp.price).toLocaleString('vi')} VNĐ</td>
              <td>{sp.quantity}</td>
              <td>{nameCate(sp.cate_id)}</td>
              <td>{formatDate(sp.ngay)}</td>
              <td>
                  <select className="an-hien-select" value={sp.an_hien} onChange={(e) => AHpr(sp.id, parseInt(e.target.value))}>
                  <option className="an-hien-option" value={0}>Đang hiện</option>
                  <option className="an-hien-option" value={1}>Đang ẩn</option>
                   </select>
                            </td>
              <td>
                <button className="btn-edit"> <Link style={{textDecoration:'none', color:'yellow'}} to={`/admin/updatePr/${sp.id}`}> Sửa </Link></button>
                <button className="btn-delete" onClick={() => DeletePr(sp.id)} >Xóa</button>
              </td>
            </tr>
          )
        ) :(
          <tr><td colSpan="8">Không tìm thấy sản phẩm nào.</td></tr>
        )
        }
      </tbody>
    </table>
  </div>
  <PaginationControl page={page} between={1} limit={limit} ellipsis={1} total={totalrow} changePage={(page) => setpage(page)} />
</div>

      
    )
}

export default AdminPr