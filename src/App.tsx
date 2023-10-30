import './App.css'
import Router from './router/Router'
import { ThemeProvider } from '@mui/material'
import theme from './utility/theme/theme'
import { Provider } from "react-redux";
import store from './redux/storeConfig/store';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Router />
          </Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
