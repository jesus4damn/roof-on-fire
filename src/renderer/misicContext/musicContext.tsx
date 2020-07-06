import * as React from 'react';
import { useState } from 'react';

export interface IMusicContext {
    currentTime: number,
    totalTime: number,
    status: "play" | "pause" | "stop" | string
}

export interface IMusicContextHook {
    musicContext: IMusicContext,
    setMusicContext: (val: IMusicContext) => void
}

const defaultContext = {
    musicContext: {currentTime: 0, totalTime: 20000, status: "stop"},
    setMusicContext: (val: IMusicContext) => { console.log(val)}
};

const MusicContext = React.createContext<IMusicContextHook>(defaultContext);

export const MusicContextProvider = ({children}: any) => {
    const [musicContext, setMusicContext] = useState<IMusicContext>({currentTime: 0, totalTime: 20000, status: 'stop'});

    return (
        <MusicContext.Provider value={{musicContext, setMusicContext}}>
            {children}
        </MusicContext.Provider>
        )
};
export const useMusicContext = () => React.useContext(MusicContext);
