import React from "react";

const HeaderContext=React.createContext({
    ProfileState:false,
    addToken:()=>{},
    removeToken:()=>{}
})
export default HeaderContext;