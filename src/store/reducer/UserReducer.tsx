interface UserState {
    user: Record<string, any>;
  }
  
  interface UserAction {
    type: string;
    payload: Record<string, any>;
  }
  
  const initState: UserState = {
    user: {},
  };
  
  const UserReducer = (state: UserState = initState, action: UserAction): UserState => {
    const { type, payload } = action;
    if (type === 'ADD_DATA') {
      return {
        ...state,
        user: payload,
      };
    } else {
      return state;
    }
  };
  
  export default UserReducer;
  