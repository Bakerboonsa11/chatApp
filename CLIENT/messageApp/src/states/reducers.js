const initialState = {
    user: {},
    isLoggedIn:false
};
const initialSignUpData={
    name:undefined,
    email:undefined,
    password:undefined
}


export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGGEDIN":
            alert("logged in");
            return { ...state, isLoggedIn: true }; // Update state

        case "LOGGEDOUT":
            alert("logged out");
            return { ...state, isLoggedIn: false }; // Update state

        default:
            return state; // Always return the current state if no action matches
    }
};

export const signUpReduces=(state=initialSignUpData,action)=>{
        
          switch(action.type){
            case "UPDATEDATA":
                alert("data is updated")
                return {
                    ...state,
                 email:action.payload.email?action.payload.email:state.email ,
                 name:action.payload.name?action.payload.name:state.name,
                 password:action.payload.password?action.payload.password:state.password
                } 
            
            default:
                return state
          }
}
