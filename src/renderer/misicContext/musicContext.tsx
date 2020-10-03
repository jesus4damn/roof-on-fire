import * as React from 'react';
import { useState } from 'react';
import useRecursiveTimeout from '../../data-helper/UseRecursiveTimeOut';

export interface IMusicContext {
    totalTime: number,
    status: "play" | "pause" | "stop" | string
}

export interface IMusicContextHook {
    musicContext: IMusicContext,
    tick: number,
    currentTime: number,
    setMusicContext: (val: IMusicContext) => void
    setCurrentTime: (val: number) => void
}

const defaultContext = {
    musicContext: {currentTime: 0, totalTime: 20000, status: "stop"},
    tick: 0,
    currentTime: 0,
    setMusicContext: (val: IMusicContext) => { console.log(val)},
    setCurrentTime: (val: number) => { console.log(val)}
};

const MusicContext = React.createContext<IMusicContextHook>(defaultContext);

export const MusicContextProvider = ({children}: any) => {
    const [musicContext, setMusicContext] = useState<IMusicContext>({totalTime: 20000, status: 'stop'});
    const [currentTime, setCurrentTime] = useState(0);
    const [tick, setTick] = useState(0);
    useRecursiveTimeout(
        () =>
            new Promise(r => {
                setTick(tick + 10);
                r();
            }), 100);
    return (
        <MusicContext.Provider value={{musicContext, tick, setMusicContext, currentTime, setCurrentTime}}>
            {children}
        </MusicContext.Provider>
        )
};
export const useMusicContext = () => React.useContext(MusicContext);
