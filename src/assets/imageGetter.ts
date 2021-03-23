const img = require('./images/fire_mashin.svg');
const timelineBack = require('./images/timecode.svg');
const reactPng = require(`./images/redux.png`);

export type svg = typeof ImgLib.svg;

export const ImgLib = {
    svg: {
        lock: './images/svg/lock.svg',
        unlock: './images/svg/unlock.svg',
        editBox: './images/svg/edit-box.svg',
        edit: './images/svg/edit.svg',
        eyeBlue: './images/svg/eye-blue.svg',
        blueClock: './images/svg/blue-clock.svg',
        dollarSign: './images/svg/dollar-sign.svg',
        chevronLeftDark: './images/svg/chevron-left-dark.svg',
        card: './images/svg/card.svg',
        cart: './images/svg/cart.svg',
        electron: './images/electron.png',
        chevronRight: './images/svg/chevron-right.svg',
        coin: './images/svg/coin.svg',
        contact: './images/svg/contact.svg',
        globe: './images/svg/globe.svg',
        mail: './images/svg/mail.svg',
        note: './images/svg/note.svg',
        notif: './images/svg/notif.svg',
        x: './images/svg/x.svg'
    }
};

export const getSvg = (key: keyof svg) => {
    const toReturn = require(`${ImgLib.svg[key]}`);
    return toReturn;
};

export const getFixtureIcon = () => {
    return img;
};

export const getTimeLineBackground = () => {
    return timelineBack
};
export const getReactPng = () => {
    return reactPng
};
