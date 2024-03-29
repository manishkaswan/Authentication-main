import React, { useReducer } from "react";
import HeaderContext from "./HeaderContext";
const intialState = {
  token: localStorage.getItem("user")
};

const reducerfn = (state, action) => {
  if (action.type === "ADD TOKEN") {
    const updatedToken = action.item;
    localStorage.setItem("user",action.item)
    return {
      token: updatedToken,
    };
  }
  if (action.type === "REMOVE TOKEN") {
    const updatedToken = null
    localStorage.removeItem("user")
    return {
      token: updatedToken,
    };
  }
  return intialState;
};
const HeaderContextProvider = (props) => {
  const [state, dispatchfn] = useReducer(reducerfn, intialState);

  const TokenSaveHandler = (data) => {
    dispatchfn({
      type: "ADD TOKEN",
      item: data,
    });
  };
  const TokenRemoveHandler = () => {
    dispatchfn({
        type: "REMOVE TOKEN",
    
      });
  };
  const HeaderContextHelper = {
  
    addToken: TokenSaveHandler,
    removeToken: TokenRemoveHandler,
    token: state.token,
  };
  return (
    <div>
      <HeaderContext.Provider value={HeaderContextHelper}>
        {props.children}
      </HeaderContext.Provider>
      {console.log("rendered")}
    </div>
  );
};
export default HeaderContextProvider;
