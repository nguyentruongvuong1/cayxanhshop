import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
    name: 'cart',
    initialState: {listSP: []},
    reducers: {
        themSP: (state, param)=>{
            let sp = param.payload; //tham so la sp ={id: 1 , tensp => A}
            let index = state.listSP.findIndex(s => s.id === sp.id);
            if(index === -1){
               sp['so_luong'] = 1;
               state.listSP.push(sp) 
            }else state.listSP[index]['so_luong']++;
            console.log("Da them sp. soSP =", param)

        },
        suaSL: (state, param) =>{
            let id = param.payload[0];
            let so_luong = param.payload[1];
            let index = state.listSP.findIndex(s => s.id === id);
            if(index !== -1) state.listSP[index].so_luong = Number(so_luong);
            console.log("Da sua san pham")
        },
        XoaSP: (state, param) =>{
            let id = param.payload;
            const index = state.listSP.findIndex(s => s.id === id);
            if(index !== -1) state.listSP.splice(index, 1);
        },

        XoaGH: state =>{ state.listSP.splice(0, state.listSP.length)}

    }
})

export const {themSP, suaSL, XoaGH, XoaSP} = cartSlice.actions;
export default cartSlice.reducer;