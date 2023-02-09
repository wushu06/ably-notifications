import React from 'react'
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

const toastOptions: object = {
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
};
interface Message {
    data?: {
        message?: string
        link?: string
    }
}
export const handleNotifications = (message: Message) =>{
    if(!message?.data?.message || !message?.data?.link){
        return;
    }
    toast((<div><Link to={message.data.link}>{message.data.message}</Link></div>), toastOptions);
}