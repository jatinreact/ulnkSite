import * as actionTypes from "../actions/actionTypes"


const initialState = {
    editProfileRes: null,
    loading: false,
    error: null
}


export const editProfileStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
        editProfileRes: null
    }
}

export const editProfileSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        editProfileRes: action.data,
        error: null
    }


}

export const editProfileFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.err
    }
}


const StyleReducer = (state = initialState, action) => {

    switch (action.type) { // above link

        case actionTypes.EDIT_PROFILE_START:
            return editProfileStart(state, action);

        case actionTypes.EDIT_PROFILE_SUCCESS:
            return editProfileSuccess(state, action);


        case actionTypes.EDIT_PROFILE_FAIL:
            return editProfileFail(state, action);


        default:
            return state;
    }

}

export default StyleReducer;
