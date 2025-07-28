export const initialState = {
    avatar: '',
    link: '',
    bio: '',
    gender: '',
    currentPassword: '',
    newPassword:'',
    confirmPassword: ''
}

export const actions = {
    set_avatar: 'SET_AVATAR'
}

const profileEditReducer = (state, action)=>{
    switch (action.type){
        case 'SET_AVATAR':
            return {...state, avatar: action.payload}
    }
}