import './App.css'
import Router from './router/Router'
import { ThemeProvider } from '@mui/material'
import theme from './utility/theme/theme'
import { Provider } from "react-redux";
import store from './redux/storeConfig/store';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router />
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default App
