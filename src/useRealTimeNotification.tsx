import * as React from 'react';
import * as Ably from 'ably';
import {handleRealTimeNotifications} from './realTimeNotifications'
import {handleNotifications} from "./notificationPopup";

const {useState, useEffect} = React

type AblyRealTime = Ably.Realtime;

export type SetState = React.Dispatch<React.SetStateAction<any>>

export interface Props {
    url: string,
    user: {id: number},
    token: string,
    setMessage: SetState;
    channelName?: string,
    broadcastAs?: string,
}

export const useRealTimeNotification = (props: Props) => {
    const [value, setValue] = useState<object>({});
    const [message, setMessage] = useState<object>({});
    useEffect(() => {
        if (!props.user) {
            return;
        }
        let ably: AblyRealTime = null;
        handleRealTimeNotifications(props, setMessage)
            .then((data: {
                ably: AblyRealTime,
                message: object,
                error
            }) => {
                setValue(data)
                ably = data.ably;
            })
            .catch((e: object) => setValue(e))
        return () => {
            ably && ably.close();
        }
    }, [props.user])

    useEffect(() => {
        handleNotifications(message)
    }, [message])

    return [message, value];
}