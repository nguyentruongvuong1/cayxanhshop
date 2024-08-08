// SliceCart.js
import { createSlice } from "@reduxjs/toolkit";

// Hàm để lưu giỏ hàng vào localStorage
const saveCart = (cartState) => {
    localStorage.setItem('cart', JSON.stringify(cartState));
};

// Hàm để lấy giỏ hàng từ localStorage
const loadCartFromLocalStorage = () => {
    try {
        const serializedCart = localStorage.getItem('cart');
        if (serializedCart === null) return [];
        return JSON.parse(serializedCart);
    } catch (err) {
        console.error("Failed to load cart from localStorage:", err);
        return [];
    }
};

const initialState = { listSP: loadCartFromLocalStorage() };

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        themSP: (state, action) => {
            const sp = action.payload;
            const index = state.listSP.findIndex(s => s.id === sp.id);
            if (index === -1) {
                sp['so_luong'] = 1;
                state.listSP.push(sp);
            } else {
                state.listSP[index]['so_luong']++;
            }
            saveCart(state.listSP);
        },

        suaSL: (state, action) => {
            const [id, so_luong] = action.payload;
            const index = state.listSP.findIndex(s => s.id === id);
            if (index !== -1) {
                state.listSP[index].so_luong = Number(so_luong);
                saveCart(state.listSP);
            }
        },

        XoaSP: (state, action) => {
            const id = action.payload;
            const index = state.listSP.findIndex(s => s.id === id);
            if (index !== -1) {
                state.listSP.splice(index, 1);
                saveCart(state.listSP);
            }
        },

        XoaGH: (state) => {
            state.listSP = [];
            saveCart(state.listSP);
        }


    }
});

export const { themSP, suaSL, XoaSP, XoaGH } = cartSlice.actions;
export default cartSlice.reducer;
