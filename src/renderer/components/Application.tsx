import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import TimeLine from "./TimeLineWorkspace/TimeLine";
import Header from "./Header/Header";
import MainWorkspace from "./MainWorkspace/MainWorkspace";
import CuesWorkspace from "./CuesWorkspace/CuesWorkspace";
require('./App.scss');

const Application = () => (
    <div className={"appWrapper"}>
        <div className={"headerWrapper"}><Header /></div>
        <div className={"mainWorkspaceWrapper"}> <MainWorkspace /></div>
        <div className={"cuesWorkspaceWrapper"}> <CuesWorkspace /></div>
        <div className={"timeLineWorkspaceWrapper"}><TimeLine /></div>
    </div>
);

export default hot(Application);
