import * as Ably from 'ably';
import axios from "axios";

let initialized = false
async function createTokenRequest(token) {
    if (initialized) {
        return;
    }
    return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/notifications/ably/token`, null,
        {
            headers: {'Authorization': `Bearer ${token}`}
        }
    )
        .then(response => {
            return response.data
        }).catch(err => {
            return err
        });

}

async function settingUpAbly(token) {
    return new Ably.Realtime({
        authCallback: async (tokenParams, callback) => {
            try {
                const tokenRequest = await createTokenRequest(token) // Make a network request to your server
                callback(null, tokenRequest)
                initialized = true
            } catch (error) {
                callback(error, null)
            }
        }
    });
}

async function connectToAbly(ably, user) {
    await ably.connection.once('connected');
    return ably.channels.get(`private:App.User.${user.id}`);
}

async function listenToChannel(channel, callback) {
    await channel.subscribe('Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', (message) => {
        callback(message);
    });
}

export async function handleRealTimeNotifications(user: any, token: string, callback: any)  {
    try {
        const ably = await settingUpAbly(token);
        const channel = await connectToAbly(ably, user);
        const message = await listenToChannel(channel, callback);
        return {
            ably,
            message,
            error: null
        }
    } catch (error) {
        return {ably: null, message: null, error}
    }
}