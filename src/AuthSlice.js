import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {daDangnhap: false, user: null, token: null, expiresIn: 0}

export const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        thoat: (state) =>{
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('expiresIn');
            state.token = null;
            state.user = null
            state.expiresIn = null
        },

        CheckLogin: (state) => {
            let token = state.token;
            let expiresIn = state.expiresIn;
            let user = state.user;
            let expiresAt = moment().add(expiresIn, 'second');
            let chua_het_han = moment().isBefore(moment(expiresAt))
            let kq = !token && !user && chua_het_han;
            
            if(kq) return;
            token = localStorage.getItem('token');
            user = localStorage.getItem('user');
            expiresIn = localStorage.getItem('expiresIn');
            expiresAt = moment().add(expiresIn, 'second')
            chua_het_han = moment().isBefore(moment(expiresAt));

            if(token && user && chua_het_han){
                state.user = JSON.parse(user);
                state.token = token;
                state.expiresIn = expiresIn;
                state.daDangnhap = true
            }
        },

        daLogin: (state, params) =>{
            state.token = params.payload.token;
            state.expiresIn = params.payload.expiresIn;
            state.user = params.payload.userInfo;
            state.daDangnhap = true;
            localStorage.setItem('token', state.token);
            localStorage.setItem('user',JSON.stringify(state.user));
            localStorage.setItem('expiresIn', state.expiresIn);
        },

    }
});

export const {daLogin, thoat, CheckLogin} = AuthSlice.actions;
export default AuthSlice.reducer;