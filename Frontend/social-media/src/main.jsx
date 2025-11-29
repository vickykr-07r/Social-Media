import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import Serverurl from './Context/Serverurl.jsx'
import { store } from './Redux/Store.js'
import { Provider } from "react-redux";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Serverurl>
      <Provider store={store}>
    <App />
    </Provider>
    </Serverurl>
    </BrowserRouter>
  </StrictMode>,
)
