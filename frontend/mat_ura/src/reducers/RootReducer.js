const initState = {
  userLoggedIn: false,
  token: ""
}

const RootReducer = (state=initState, action) => {
  switch(action.type){
        case 'LOG_IN':
            return{
                ...state,
                userLoggedIn: true
            }
        case 'LOG_OUT':
            return{
                ...state,
                userLoggedIn: false,
                token: "",
                user: null
            }
        case 'SET_TOKEN':
            return{
                ...state,
                token: action.token
            }
        case 'SET_USER':
        return{
            ...state,
            user: action.user
        }
        default:
            return{
                ...state
            }
  }
}

export default RootReducer