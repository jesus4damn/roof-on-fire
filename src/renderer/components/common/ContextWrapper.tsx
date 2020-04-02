import * as React from 'react';
require('./contextMenu.scss');


interface IProps {
    options: {
        title: string,
        callback: () => void
    }
}

export class ContextMenu extends React.Component<IProps, any, any> {
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
    };

    _handleClick = (event:any) => {
        const { visible } = this.state;
        const wasOutside = !(event.target.contains === this.root);

        if (wasOutside && visible) this.setState({ visible: false, });
    };

    _handleScroll = () => {
        const { visible } = this.state;

        if (visible) this.setState({ visible: false, });
    };

    render() {
        const { visible } = this.state;

        return(
            <>
                {(visible || null) && <div ref={ref => {this.root = ref}} className="contextMenu">
                    <div className="contextMenu--option">Share this</div>
                    <div className="contextMenu--option">New window</div>
                    <div className="contextMenu--option">Visit official site</div>
                    <div className="contextMenu--option contextMenu--option__disabled">View full version</div>
                    <div className="contextMenu--option">Settings</div>
                    <div className="contextMenu--separator" />
                    <div className="contextMenu--option">About this app</div>
                </div>}
                {this.props.children}
            </>
        )

    };
}
