export type IMainScreenSwitchers = 'visualiser' | 'cueListWindow';
export type IAppScreenModes = 'main' | 'patch' | 'output';
export type IMainRightScreenSwitchers =  'fixtures' | 'cuesWindow' | null;
export type IActionsScreenSwitchers = 'long' | 'dynamic' | 'static' | 'cues';

export interface IContextMenuOption {
    title: string,
    disabled: boolean,
    callback: () => void,
}
