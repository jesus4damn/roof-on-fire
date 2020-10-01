const path = require('path');
const electron = require('electron');
const fs = require('fs');

export type TMusic = typeof musicLib;

let musicLib = {
    bloodGang: require('./music/bloodGang.mp3'),
};

export const getMp3 = (key: string):string => {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    console.log(key);
    // @ts-ignore
    if (musicLib[key]) {
        // @ts-ignore
        const mp3File = musicLib[key];
        return mp3File;
    } else return "ERROR"
};

export const getMusicList = ():Array<string> => {
    return Object.keys(musicLib)
};


export const setMp3 = (url: string, name: string) => {
    console.log(url);
    // @ts-ignore
    musicLib[name] = url
};

export const saveMp3 = (file: File) => {
    console.log(path.join(file.path));
    let src = URL.createObjectURL(file);

    const userDataPath = (electron.app || electron.remote.app).getPath('userData');

    let fileName = file.name.split(" ")[0];
    const mp3File = path.join(userDataPath, fileName + '.mp3');

    const mp3_file = fs.createWriteStream(mp3File);

    mp3_file.on('open', function (fd: any) {
            console.log("loading... \n");
            mp3_file.write(src);
            console.log("finalizing...");
            mp3_file.end();


    // @ts-ignore
        musicLib[fileName] = mp3File;
    })
};
