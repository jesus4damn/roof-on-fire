import axios from "axios";

const route = "http://localhost:5000";

export const controllerAPI = {
    sendEvent: async (event: string) => {
        console.log(event);
        const res = await axios.post(`${route}/dmx/${event}`, event);
        console.log(res);
    },
    sendVal: async (val: {channel: number , value: number}) => {
        const res = await axios.post(`${route}/dmx/set`, val);
        console.log(res);
        return "AAAAAA";
    },
    getPacket: async () => {

    }
};
