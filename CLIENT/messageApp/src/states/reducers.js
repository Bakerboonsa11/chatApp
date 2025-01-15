const initialState = {
    user: {},
    isLoggedIn:false,
    token:undefined
};
const initialSignUpData={
    name:undefined,
    email:undefined,
    password:"094930Bb",
    phoneNumber:undefined
}


export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGGEDIN":
      console.log("LOGGEDIN action dispatched with payload:", action.payload);
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "LOGGEDOUT":
      console.log("LOGGEDOUT action dispatched");
      return {
        ...state,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};


export const signUpReduces=(state=initialSignUpData,action)=>{
        
          switch(action.type){
            case "UPDATEDATA":
               
                       return {
                    ...state,
                 email:action.payload.email?action.payload.email:state.email ,
                 name:action.payload.name?action.payload.name:state.name,
                 password:action.payload.password?action.payload.password:state.password,
                 phoneNumber:action.payload.phoneNumber?action.payload.phoneNumber:state.password
                }
              
            
            default:
                return state
          }
   
}
