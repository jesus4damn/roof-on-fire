import axios from "axios";
import { IFixture } from '../../../types/fixtureTypes';
import { RootState } from '../../store/rootReducer';

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
    sendFixture: async (fixture: IFixture) => {
        try {
            const res = await axios.post(`${route}/dmx/action`, fixture);
            console.log(res);
        } catch (e) {
            console.log(e)
        }
    },
    sendInitDevises: async (fixtures: IFixture[]) => {
        try {
            const res = await axios.post(`${route}/dmx/initDevices`, fixtures);
            console.log(res);
        } catch (e) {
            console.log(e)
        }
    },
    sendPatch: async (type: string, fixture: string, count: number) => {
        const res = await axios.post(`${route}/fixtures/${type}?fixture=${fixture}&count=${count}`);
        console.log(res);
        return "AAAAAA";
    },
    saveShowFile: async (state: RootState, path: string) => {
        try {
            const res = await axios.post(`${route}/dmx/save`, {path: path, data: state});
            return res;
        } catch (e) {
            console.log(e);
            throw e;
        }
    },
    loadShowFile: async (path: string) => {
        try {
            const res: {data: RootState} = await axios.post(`${route}/dmx/load`, {path: path ? path : ""});
            return res.data;
        } catch (e) {
            throw e;
        }
    },
};
