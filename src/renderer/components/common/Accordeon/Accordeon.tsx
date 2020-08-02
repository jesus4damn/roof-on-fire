import * as React from 'react';

require('./Accordeon.scss');

interface IProps {
    className?: string,
    headerTitle: string,
    children: any
}
const arrowImg = require('../../../../assets/images/svg/arrow-accordeon.svg');
export const getArrowImg = () => {
    return arrowImg;
};
const arrowImgCollapsed = require('../../../../assets/images/svg/arrow-collapsed.svg');
export const getArrowImgCollapsed = () => {
    return arrowImgCollapsed;
};
const Accordeon: React.FC<IProps> = (props) => {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
        <div className="FrameAccordion">
            <h2>
                {props.headerTitle}
            </h2>
            <span className={!collapsed ? 'FrameAccordionImg-collapsed ' : 'FrameAccordionImg'}
                  onClick={() => setCollapsed(!collapsed)}/>
                  <img src={getArrowImgCollapsed()} alt="" className={!collapsed ? 'FrameAccordionImg-collapsed' : 'FrameAccordionImg'}
                  onClick={() => setCollapsed(!collapsed)}/>
            <div className={!collapsed ? 'AccordionBottom-collapsed ' : 'AccordionBottom'}>
                {props.children}
            </div>
        </div>
    );
};

export default React.memo(Accordeon);
