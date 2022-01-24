import * as actionTypes from "../actions/actionTypes"


const initialState = {
    editProfileRes: null,
    enbShareBtnRes:null,
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


export const enbShareBtnStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
        enbShareBtnRes: null
    }
}

export const enbShareBtnSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        enbShareBtnRes: action.data,
        error: null
    }


}

export const enbShareBtnFail = (state, action) => {
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


            case actionTypes.ENB_SHARE_BTN_START:
                return enbShareBtnStart(state, action);
    
            case actionTypes.ENB_SHARE_BTN_SUCCESS:
                return enbShareBtnSuccess(state, action);
    
    
            case actionTypes.ENB_SHARE_BTN_FAIL:
                return enbShareBtnFail(state, action);
    
        default:
            return state;
    }

}

export default StyleReducer;
