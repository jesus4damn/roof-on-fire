import * as React from 'react';
import { IContextMenuOption } from '../../../types/appTypes';
require('./contextMenu.scss');


interface IProps {
    options: IContextMenuOption[],
    onClose: () => void
}
interface IState {
    visible: boolean,
}


export class ContextMenu extends React.Component<IProps, IState, any> {
    root: HTMLDivElement | null | undefined;
    constructor(props: any) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    componentDidMount() {
        document.addEventListener('contextmenu', this._handleContextMenu);
        document.addEventListener('click', this._handleClick);
        document.addEventListener('scroll', this._handleScroll);
    };

    componentWillUnmount() {
        document.removeEventListener('contextmenu', this._handleContextMenu);
        document.removeEventListener('click', this._handleClick);
        document.removeEventListener('scroll', this._handleScroll);
    }

    _handleContextMenu = (event: { preventDefault: () => void; clientX: any; clientY: any; }) => {
        event.preventDefault();
        if (this.props.options.length) {
            this.setState({ visible: true });

            const clickX = event.clientX;
            const clickY = event.clientY;
            const screenW = window.innerWidth;
            const screenH = window.innerHeight;
            // @ts-ignore
            const { offsetWidth: rootW, offsetHeight: rootH } = this.root;

            const right = (screenW - clickX) > rootW;
            const left = !right;
            const top = (screenH - clickY) > rootH;
            const bottom = !top;

            if (right && this.root) {
                this.root.style.left = `${clickX + 5}px`;
            }
            if (left && this.root) {
                this.root.style.left = `${clickX - rootW - 5}px`;
            }
            if (top && this.root) {
                this.root.style.top = `${clickY + 5}px`;
            }

            if (bottom && this.root) {
                this.root.style.top = `${clickY - rootH - 5}px`;
            }
        }
    };

    _handleClick = (event:any) => {
        const { visible } = this.state;
        const wasOutside = !(event.target.contains === this.root);

        if (wasOutside && visible) {
            this.props.onClose();
            this.setState({ visible: false })
        }
    };

    _handleScroll = () => {
        const { visible } = this.state;

        if (visible) {
            this.props.onClose();
            this.setState({ visible: false, })
        }
    };

    render() {
        const { visible } = this.state;

        return(
            <>
                {(visible || null) && <div ref={ref => {this.root = ref}} className="contextMenu">
                    {this.props.options.map((o, i)=> (
                        <div key={o.title + i}
                             className={`contextMenu--option${o.disabled ? ' disabled' : ''}`}
                             onClick={o.callback}>
                            {o.title}
                        </div>
                    ))}
                </div>}
                {this.props.children}
            </>
        )

    };
}
