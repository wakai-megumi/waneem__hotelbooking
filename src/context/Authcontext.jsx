import { createContext, useEffect, useReducer } from "react"
import propsvalidation from "prop-types"

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  loading: false,
  error: null,
}

export const Authcontext = createContext(INITIAL_STATE)
const Authreducer = (state, action) => {
  switch (action.type) {
    case "START":
      return {
        ...INITIAL_STATE,
        loading: true,
      }
    case "SUCCESS":
      return {

        ...INITIAL_STATE,
        currentUser: action.payload,
        loading: false,
      }
    case "FAILURE":
      return {
        ...INITIAL_STATE,
        error: action.payload,
        loading: false,
      }
    case "LOGOUT":
      return INITIAL_STATE

    default:
      return state
  }
}

export const Authcontextprovider = ({ children }) => {
  const [state, dispatch] = useReducer(Authreducer, INITIAL_STATE)

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(state.currentUser))
  }, [state.currentUser])
  return (
    <Authcontext.Provider
      value={{
        currentUser: state.currentUser,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Authcontext.Provider>
  )
}
Authcontextprovider.propTypes = {
  children: propsvalidation.node.isRequired,
}
