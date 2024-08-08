import { useState, useEffect } from "react"
import { PaginationControl } from "react-bootstrap-pagination-control"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
function AdminCate() {

    const [ct, setct] = useState([]);
    const [page, setpage] = useState(1);
    const [totalrow, settotalrow] = useState(0);
    const limit = 4;
    const [ search, setsearch] = useState('')
    const [ AllCate, setAllCate] = useState([])
    const [ spfilter, setspfilter] = useState([])

    const token = useSelector(state => state.auth.token)
    
    useEffect(() =>{
      let opt = {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

        fetch(`http://localhost:3000/admin/cate/dem`,opt).then(res => res.json()).then(data => {
            if(data.total !== undefined){
                settotalrow(data.total)
            }else{
                console.error("Invalid data structure for total rows", data);
            }
        })
        fetch(`http://localhost:3000/admin/cate?page=${page}&limit=${limit}`, opt).then(res => res.json()).then(data => setct(data));
        fetch(`http://localhost:3000/cate`).then(res => res.json()).then(data => setAllCate(data));

    }, [page, token])


    const onchangeSearch = (e) =>{
      setsearch(e.target.value);
    }

    useEffect(() =>{
      if(search === ''){
        setspfilter(ct)
      }else{
        const FilterPr = AllCate.filter(sp => sp.name.toLowerCase().includes(search.toLowerCase()))
        setspfilter(FilterPr)
      }
    }, [AllCate, ct, search])

  const DeleteCate = (id) =>{
    const hoi = window.confirm('Bạn có chắc muốn xóa danh mục này không');
    if(hoi){
      let opt = {method:'DELETE', headers:{'Content-Type':'application/json' , 'Authorization': 'Bearer ' + token }}
      fetch(`http://localhost:3000/admin/cate/${id}`,opt).then(res => res.json()).then(data =>{
        alert('Bạn đã xóa sản phẩm thành công')
        window.location.reload();
      })
    }else window.location.reload();
      
      
  }

  const AHpr = (id, value) =>{
    let url = `http://localhost:3000/admin/cateAH/${id}`
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
    <p ><Link href="#" to={'/admin/cates'}> danh mục</Link></p>
</div>
  <Link href="#" className="btn-add-product" to={"/admin/addCate"}>Thêm danh mục</Link>
  
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
          <th>Ẩn hiện</th>
          <th>Chức năng</th>
        </tr>
        {
          spfilter.length > 0 ?(
            spfilter.map(sp =>
              <tr key={sp.id}>
                <td>{sp.name}</td>
                <td>
                  <img height="150px" width="150px" src={sp.img.startsWith('./public/Images') ? `http://localhost:3000/${sp.img}` :sp.img  } alt={sp.name} />
                  </td>
                <td>
                    <select className="an-hien-select" value={sp.an_hien} onChange={(e) => AHpr(sp.id, parseInt(e.target.value))}>
                    <option className="an-hien-option" value={0}>Đang hiện</option>
                    <option className="an-hien-option" value={1}>Đang ẩn</option>
                     </select>
                              </td>
                <td>
                  <button className="btn-edit"> <Link style={{textDecoration:'none', color:'yellow'}} to={`/admin/updateCate/${sp.id}`}> Sửa </Link></button>
                  <button className="btn-delete" onClick={() => DeleteCate(sp.id)} >Xóa</button>
                </td>
              </tr>
            )
          ):(
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

export default AdminCate