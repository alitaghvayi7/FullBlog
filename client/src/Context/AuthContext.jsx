import { useContext, createContext, useReducer,useEffect } from "react";

const initialState = {
  user: JSON.parse(window.localStorage.getItem("blogUser")) || null,
  isLoading: false,
  error: false,
};

const UserActions = (state, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        error: false,
        isLoading: true,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    case "LOGIN_SUCCESS":
      return {
        error: false,
        isLoading: false,
        user: action.payload,
      };
      case "LOGIN_UPDATED":
        return {
          error: false,
          isLoading: false,
          user: action.payload,
        };
    case "LOG_OUT":
      return{
        user:null,
        isLoading:false,
        error : false
      }

    default:
      return state;
  }
};

const UserState = createContext();
const UserDispatch = createContext();

export function useUserState(){
    const context = useContext(UserState);
    if(!context){
        throw Error('Main Provider Must Be Implemented');
    }
    return context;
}

export function useUserDispatch(){
    const context = useContext(UserDispatch);
    if(!context){
        throw Error('Main Provider Must Be Implemented');
    }
    return context;
}

export function AuthProvider({ children }) {

  const [state, dispatch] = useReducer(UserActions, initialState);

  useEffect(() => {
    window.localStorage.setItem("blogUser",JSON.stringify(state.user))
    return () =>{
      window.localStorage.removeItem("blogUser");
    }
  }, [state.user]);
  
  return (
    <UserState.Provider value={state}>
      <UserDispatch.Provider value={dispatch}>{children}</UserDispatch.Provider>
    </UserState.Provider>
  );
}
