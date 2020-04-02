import * as React from "react";

require('./CueLine.scss');

interface IProps {
    cueItem: any,
    update: (cueItem: any) => void
}

const CueLine:React.FC<IProps & any> = ({cueItem}) => {
    const [cueWidth, setCueWidth] = React.useState(100);
    const [isOpen, setCueOpen] = React.useState(false);
    const asd = () => {
        setCueWidth(cueWidth + 200)
    };
    const checkIsOpen = () => {
        setCueOpen(!isOpen)
    };
    const classnameForOpen = isOpen ? '' : '';

    return (
        <div className={classnameForOpen} style={{width: `${cueWidth}px`}}>
            {isOpen
                ? <div onClick={checkIsOpen}>
                    opened <span onClick={asd}>X</span>
                </div>
                : <div className={'timelineCue'} onClick={checkIsOpen}>
                    <span className={'timelineCue-triangle'}>asd</span>
                </div>
            }
        </div>
    )
};

export default CueLine;
