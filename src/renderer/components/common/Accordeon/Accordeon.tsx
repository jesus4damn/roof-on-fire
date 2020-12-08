import * as React from 'react';
import { useEffect } from 'react';

require('./Accordeon.scss');

interface IProps {
  className?: string,
  disabled?: boolean,
  selected?: boolean,
  expanded?: boolean,
  onClick?: (val: boolean) => void,
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
  const [collapsed, setCollapsed] = React.useState(props.expanded ? props.expanded : false);
  useEffect(() => {
    if (props.onClick) {
      props.onClick(collapsed)
    }
  }, [collapsed])
  return (
    <div className="FrameAccordion" style={props.disabled ? {pointerEvents: 'none', color: '#7b7b7b'} : {}}>
      <h2>
        {props.headerTitle}
        {props.selected ? <div className="AccordionIndicator"> </div> : null}
      </h2>
      <span className={!collapsed ? 'FrameAccordionImg-collapsed ' : 'FrameAccordionImg'}
            onClick={() => setCollapsed(!collapsed)} />
      <img src={!collapsed ? getArrowImgCollapsed() : getArrowImg()} alt=""
           className={!collapsed ? 'FrameAccordionImg-collapsed Imgitem' : 'FrameAccordionImg Imgitem'}
           onClick={() => setCollapsed(!collapsed)} />
      <div className={!collapsed ? 'AccordionBottom-collapsed ' : 'AccordionBottom'}>
        {props.children}
      </div>
    </div>
  );
};

export default React.memo(Accordeon);
