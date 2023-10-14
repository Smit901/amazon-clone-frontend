import React, { useReducer, createContext } from 'react';

// Initial state for the context
const initialState = {
  token: null,
};

// Define the reducer function to manage state changes
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, token: action.token };
    case 'LOGOUT':
      return { ...state, token: null };
    default:
      return state;
  }
};

// Create the context
const AuthContext = createContext();

// AuthProvider component to wrap your application
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (token) => {
    dispatch({ type: 'LOGIN', token });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ token: state.token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
