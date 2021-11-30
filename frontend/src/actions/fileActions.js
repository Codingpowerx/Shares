import axios from 'axios'
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


export const fileUpload = (uploadss) => async (dispatch) => {
    try {

        dispatch({ type: UPLOAD_REQUEST })
        const config = {
            'Content-type': 'multipart-form-data'
        }

        const { data } = await axios.post('/api/v1/share', uploadss , config)
        
        dispatch({
            type: UPLOAD_SUCCESS,
            payload: data.file
        })

    } catch (error) {
        dispatch({
            type: UPLOAD_FAIL,
            payload: error.response.data.message
        })
    }
}



export const allFiles = () => async (dispatch) => {
    try {

        dispatch({ type: GET_FILES_REQUEST })

        const { data } = await axios.get('/api/v1/share')
        
        dispatch({
            type: GET_FILES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_FILES_FAIL,
            payload: error.response.data.message
        })
    }
}

//export const deleteFile = (id) => async (dispatch) => {
//    try {
//
//        await axios.delete(`/api/v1/share/${id}`)
//        
//        dispatch({
//            type: DELETE_FILE_SUCCESS
//        })
//    } catch (error) {
//        dispatch({
//            type: DELETE_FILE_FAIL,
//            payload: error.response.data.message
//        })
//    }
//}


//// clear errors

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}