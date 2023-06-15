import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { SearchcontextProvider } from "./context/Searchcontext.jsx"
import { Authcontextprovider } from "./context/Authcontext.jsx"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Authcontextprovider>
      <SearchcontextProvider>
        <App />
      </SearchcontextProvider>
    </Authcontextprovider>
  </React.StrictMode>
)
