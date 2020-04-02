import * as React from "react";

require('./CueLine.scss');

interface IProps {
    cueItem: any,
    update: (cueItem: any) => void
}

const CueLine:React.FC<IProps & any> = ({cueItem}) => {
    const [cueWidth, setCueWidth] = React.useState(100)
    const [isOpen, setCueOpen] = React.useState(false)
    const asd = () => {
        setCueWidth(cueWidth + 200)
    }
    const checkIsOpen = () => {
        setCueOpen(!isOpen)
    }
    const classnameForOpen = isOpen ? '' : ''
    return (
<<<<<<< HEAD
        <div className={classnameForOpen} style={{width: `${cueWidth}px`}}>
            { isOpen
                ? <div onClick={checkIsOpen}>
                    opened <span onClick={asd}>X</span>
                    </div>
                : <div className={'timelineCue'} onClick={checkIsOpen}>
                     <span className={'timelineCue-triangle'} >                        
                     </span>
                     </div>
=======
        <div className={'timelineCue'}>
            { isOpen
                ? <div>opened</div>
                : <div>closed</div>
>>>>>>> b8e90f9dc8f403df44e533f8099616e4d14f5237
            }
        </div>
    )
};

export default CueLine;
