export type music = typeof musicLib.music;

const  musicLib = {
    music : {
        bloodGang: './music/bloodGang.mp3',
        guanoApes: './music/guanoApes.mp3'
    }
};

export const getMp3 = (key: keyof music) => {
    const toReturn = require(`${musicLib.music[key]}`);
    return toReturn;
};

//
// export const getMp3 = (filePath: string) => {
//     const songPromise = new Promise((resolve, reject) => {
//         fs.readFile(filePath, (err: any, data: any) => {
//             if (err) { reject(err); }
//             resolve(dataurl.convert({ data, mimetype: 'audio/mp3' }));
//         });
//     });
//     return songPromise;
// };

// const openFile = exports.openFile = () => {
//     const files = dialog.showOpenDialog({
//         title: 'Open File',
//         properties: [ 'openFile' ],
//         filters: [
//             {name: 'Audio Files', extensions: ['mp3']},
//         ]
//     });
//
//     if (!files) { return; }
//
//     const filePath = files[0];
//     return createSongObject(filePath);
// };
//
// const getDuration = (filePath) => {
//     const durationPromise = new Promise((resolve, reject) => {
//         mp3Duration(filePath, (err, duration) => {
//             if (duration) {
//                 resolve(duration);
//             }
//             if (err) { reject(err); }
//         });
//     });
//     return durationPromise;
// };
//
// const getTags = (track) => {
//     const { filePath } = track;
//     const tagsPromise = new Promise((resolve, reject) => {
//         id3({ file: filePath, type: id3.OPEN_LOCAL }, (err, tags) => {
//             if (tags) {
//                 const { title, album, artist } = tags;
//                 Object.assign(track, { title, album, artist, track: tags.v1.track });
//                 resolve(track);
//             }
//             if (err) { reject(err); }
//         });
//     });
//     return tagsPromise;
// };
//
// const createSongObject = (filePath) => {
//     const track = {};
//     return getDuration(filePath)
//         .then((duration) => Object.assign(track, { duration, filePath }))
//         .then((track) => getTags(track));
// };
