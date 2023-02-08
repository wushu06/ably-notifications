import * as React from 'react';
import * as Ably from 'ably';
import {handleRealTimeNotifications} from './realTimeNotifications'
const { useState, useEffect } = React

type MyCallback = (message: object) => void;
type AblyRealTime = Ably.Realtime;

export function useRealTimeNotification(user: object, token: string, callback: MyCallback) {
    const [value, setValue] = useState({});
    useEffect(() => {
        if (!user) {
            return;
        }
        let ably: AblyRealTime = null;
        const a = handleRealTimeNotifications(user, token, callback)
            .then((data: {
                ably: AblyRealTime,
                message: object,
                error
            }) => {
                setValue(data)
                ably = data.ably;
            })
            .catch((e: object) => setValue(e))
        console.log(a);
        return () => {
            ably && ably.close();
        }
    }, [user])

    return value;
}