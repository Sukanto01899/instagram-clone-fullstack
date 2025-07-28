export const actions = {
    set_image: 'SET_IMAGE',
    set_caption: "SET_CAPTION",
    reset_state: 'RESET'
}

export const initialState = {
  caption: "",
  image: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_IMAGE":
      return { ...state, image: action.payload };
    case "SET_CAPTION":
      return { ...state, caption: action.payload };
    case "RESET":
        return {}
    default:
      return initialState;
  }
};


export default reducer;