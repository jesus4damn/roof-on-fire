import * as React from 'react';

require('./Accordeon.scss');

interface IProps {
    className?: string,
    headerTitle: string,
    children: any
}


const Accordeon: React.FC<IProps> = (props) => {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
        <div className="FrameAccordion">
            <h2>
                {props.headerTitle}
            </h2>
            <span className={!collapsed ? 'FrameAccordionImg-collapsed ' : 'FrameAccordionImg'}
                  onClick={() => setCollapsed(!collapsed)}/>
            <div className={!collapsed ? 'AccordionBottom-collapsed ' : 'AccordionBottom'}>
                {props.children}
            </div>
        </div>
    );
};

export default React.memo(Accordeon);
