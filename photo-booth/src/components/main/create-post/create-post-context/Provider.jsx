import { useReducer } from "react";
import reducer, { initialState } from "./PostReducer";
import { CreatePostContext } from "./context";

const CreatePostContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <CreatePostContext.Provider value={{state, dispatch}}>
            {children}
        </CreatePostContext.Provider>
    );
};

export default CreatePostContextProvider;