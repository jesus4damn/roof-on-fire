export type IMainScreenSwitchers = 'visualiser' | 'cueListWindow';
export type IMainScreenSettingsSwitcher = {width:number, height:number, image:string}
export type IAppScreenModes = 'main' | 'patch' | 'output';
export type IMainRightScreenSwitchers =  'fixtures' | 'cuesWindow' | null;
export type IActionsScreenSwitchers = 'long' | 'dynamic' | 'static' | 'cues' | 'all';

export interface IContextMenuOption {
    title: string,
    disabled: boolean,
    callback: () => void,
}
export type Partial<T> = {
    [P in keyof T]?: T[P];
};