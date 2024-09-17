import axios from 'axios';
import { BASEURL, NEWBASEURL } from '../Api/Api';
import Cookie from 'cookie-universal'
const cookies = Cookie();
const token =cookies.get("EComerce")
export const AxiosCreate= axios.create(
    {
        baseURL:BASEURL,
        headers:{
            Authorization:token
        }
    })
export const PhotoAxios= axios.create(
    {
        baseURL:NEWBASEURL,
        headers:{
            Authorization:token
        }
    })
