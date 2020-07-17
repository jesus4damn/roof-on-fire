import * as React from 'react';
import { useRef } from 'react';
import { Rnd } from 'react-rnd';
import './../App.scss';

interface IProps {
    children: any
}
interface IState {
    isOpen: boolean,
    mainWidth: number,
    cuesWidth: number,
    height: number
}

const ResizeContainer: React.FC<IProps> = (props: IProps) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const { clientHeight, clientWidth } = parentRef && parentRef.current
        ? parentRef.current
        : {clientHeight: 700, clientWidth: 1200};

    const [state, setAllState] = React.useState<IState>(
        {
            isOpen: false,
            mainWidth: clientWidth / 3 * 2,
            cuesWidth: clientWidth / 3,
            height: clientHeight
        }
    );
    const setState = //<Key extends keyof IState, Value extends IState[Key]>
    (commonState: any) => setAllState({...state, ...commonState});

    console.log(state.mainWidth);
    return (
        <div className="contentWorkspaceWrapper" ref={parentRef} >
            <div style={{width: state.mainWidth+"px", maxWidth: state.mainWidth+"px", height: clientHeight - 50+"px", position: "relative", overflow: "hidden"}}>
                {props.children[0]}
            </div>
            <Rnd
                //className={'cuesWrapperContentScroll'}
                style={{borderLeft: "3px solid white"}}
                disableDragging={true}
                default={{
                    x: state.mainWidth + 35,
                    y: 0,
                    width: state.cuesWidth,
                    height: state.height
                }}
                size={{ width: state.cuesWidth, height: clientHeight }}
                minWidth={270}
                maxWidth={780}
                bounds="body"
                enableResizing={{
                    top:false,
                    right: false,
                    bottom:false, left:true,
                    topRight:false, bottomRight:false, bottomLeft:false, topLeft:false
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    console.log({
                        cuesWidth: ref.clientWidth,
                        mainWidth: +clientWidth - +ref.clientWidth
                    });
                    setState({
                        cuesWidth: ref.clientWidth,
                        mainWidth: +clientWidth - +ref.clientWidth
                    });
                }}
            >
                {props.children[1]}
            </Rnd>
        </div>
        )
};
export default ResizeContainer;
