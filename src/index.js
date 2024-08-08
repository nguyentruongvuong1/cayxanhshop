import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowdetalPr from './Prdetail';
import ShowPrbyCate from './Prbycate';
import ShowCart from './cart';
import Thanhtoan from './Thanhtoan';
import FormLogin from './Login';
import Showsplike from './PrLike';
import FormRegister from './Register';
import Main from'./Main';
import Admin from './Admin/Admin'
import AddCate from './Admin/Admin-AddCate'
import AddPr from './Admin/Admin-AddPr';
import AdminCate from './Admin/Admin-Cate';
import AdminPr from './Admin/Admin-Products';
import AdminUpdateCate from './Admin/Admin-UpdateCate';
import AdminUpdatePr from './Admin/Admin-UpdatePr';
import ProtectAdmin from './ProtectAdmin';
import UserInfo from './UserInfo';
import Doipass from './Doipass';
import Checkdoipass from './Checkdoipass';
const Root = () =>{
  return(
  <BrowserRouter >
  <Routes>
  <Route path='/' element={<> <UserInfo /> <App/> </>} >
  <Route  index element={<Main/>} />
  <Route path='sp/:id' element={<ShowdetalPr/>} />
  <Route path='cate/:id_loai' element={<ShowPrbyCate/>} />
  <Route path='splike/' element={<Showsplike/>} />
  <Route path='cart' element={<ShowCart/>} />
  <Route path='thanhtoan' element={<Thanhtoan/>} />
  <Route path='login' element={<FormLogin/>} />
  <Route path='register' element={<FormRegister/>} />
  <Route path='doipass/:id' element={<> <Checkdoipass /> <Doipass/> </> } />

  </Route>

  <Route path='/admin' element={<> <UserInfo /> <ProtectAdmin /> <Admin /> </>} >
    <Route path='products' element={ <AdminPr /> } />
    <Route path='addpr' element={ <AddPr /> } />
    <Route path='updatePr/:id' element={ <AdminUpdatePr /> } />
    <Route path='cates' element={ <AdminCate /> } />
    <Route path='addcate' element={ <AddCate /> } />
    <Route path='updateCate/:id' element={ <AdminUpdateCate /> } />

  </Route>
   </Routes>
   
    </BrowserRouter>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Root />
    </Provider>
);


reportWebVitals();
