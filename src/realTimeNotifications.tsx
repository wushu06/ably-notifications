import * as Ably from 'ably';
import axios from "axios";
import {Props, SetState} from './useRealTimeNotification'

interface Data {
    ably: Ably.Realtime,
    message?: object,
    error?: object
}

let initialized: boolean = false

const createTokenRequest = async (props: Props): Promise<any> => {
    if (initialized) {
        return;
    }
    return axios.post(
        props.url, 
        null,
        {headers: {'Authorization': `Bearer ${props.token}`}}
    )
        .then(response => {
            return response.data
        }).catch(err => {
            return err
        });

}

const settingUpAbly = async (props: Props): Promise<Ably.Realtime> => {
    return new Ably.Realtime({
        authCallback: async (tokenParams, callback) => {
            try {
                const tokenRequest = await createTokenRequest(props)
                callback(null, tokenRequest)
                initialized = true
            } catch (error) {
                callback(error, null)
            }
        }
    });
}

const connectToAbly = async (ably: Ably.Realtime, user: {id: number}): Promise<any> => {
    await ably.connection.once('connected');
    return ably.channels.get(`private:App.User.${user.id}`);
}

const listenToChannel = async (channel, setMessage: SetState): Promise<SetState> => {
    return await channel.subscribe('Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', (message: object) => {
        setMessage(message);
    });
}

export const handleRealTimeNotifications = async (props: Props, setMessage): Promise<Data> => {
    try {
        const ably = await settingUpAbly(props);
        const channel = await connectToAbly(ably, props.user);
        const message = await listenToChannel(channel, setMessage);
        return {
            ably,
            message,
            error: null
        }
    } catch (error) {
        return {ably: null, message: null, error}
    }
}