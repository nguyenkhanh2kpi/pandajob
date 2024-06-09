import { hostName } from '../../global';
import {
    JOB_REQUERST,
    JOB_SUCCESS,
    JOB_ERROR
} from './ActionType';
import axios from "axios";


export const loadJob=()=>async (dispatch)=>{

    dispatch({type:JOB_REQUERST});
       
        try {
            let response = await axios.get(`${hostName}/job-posting`);
            dispatch({type:JOB_SUCCESS,payload : response.data.data});
      
        } catch (error) {
            dispatch({type:JOB_ERROR,payload : error.message});
        }
}