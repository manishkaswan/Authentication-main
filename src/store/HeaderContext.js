import React from "react";

const HeaderContext=React.createContext({
    token:null,
    addToken:(data)=>{},
    removeToken:()=>{}
})
export default HeaderContext;