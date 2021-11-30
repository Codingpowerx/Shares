import {
    UPLOAD_REQUEST,
    UPLOAD_SUCCESS,
    UPLOAD_FAIL,
    GET_FILES_REQUEST,
    GET_FILES_SUCCESS,
    GET_FILES_FAIL,
    //DELETE_FILE_SUCCESS,
    //DELETE_FILE_FAIL,
    CLEAR_ERRORS
} from '../constants/fileConstants'

// export const fileReducer = (state = { file : {} }, action) => {
//     switch (action.type) {
        
//         case UPLOAD_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             }
        
//         case UPLOAD_SUCCESS:
//             return {
//                 loading: false,
//                 file: action.payload
//             }
        
//         case UPLOAD_FAIL:
//             return {
//                 loading: false,
//                 ...state,
//                 error: action.payload,
//                 file: null
//             }
        
//         case CLEAR_ERRORS:
//             return {
//                 ...state,
//                 error: null
//             }

//         default:
//             return state
//     }
// }

export const allFilesReducer = (state = { uploads : [] }, action) => {
    switch (action.type) {
        
        case GET_FILES_REQUEST:
            return {
                loading: true,
                uploads: []
            }
        
        case UPLOAD_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case GET_FILES_SUCCESS:
            return {
                loading: false,
                uploads: action.payload.file
            }
        
        case UPLOAD_SUCCESS:
             return {
                 loading: false,
                 file: action.payload
             }
        
        case GET_FILES_FAIL:
            return {
                loading: false,
                ...state,
                error: action.payload
            }
        
        case UPLOAD_FAIL:
            return {
                loading: false,
                ...state,
                error: action.payload,
            }
            
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}