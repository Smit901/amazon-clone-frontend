import './App.css'
import Router from './router/Router'
import { ThemeProvider } from '@mui/material'
import theme from './utility/theme/theme'

function App() {

  return (
    <>  
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
    </>
  )
}

export default App
