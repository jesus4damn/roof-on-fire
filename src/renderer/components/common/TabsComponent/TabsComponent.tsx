import * as React from 'react';
import { IMainRightScreenSwitchers, IMainScreenSwitchers } from '../../../../types/appTypes';

require('./TabsComponent.scss');



interface IProps {
  buttons: Array<string>,
  callBack: (val: string | IMainScreenSwitchers | IMainRightScreenSwitchers) => void,
  active: IMainScreenSwitchers | IMainRightScreenSwitchers | string
}

const TabsComponent: React.FC<IProps> = ({ buttons, callBack, active }) => {

  return (
    <div className="navGroup">
      <div className="navGroupButton">
          {buttons && buttons.map((b) => <button className={active === b ? 'navGroupButtonActive' : ''}
                                                                  onClick={() => callBack(b)}>
          {b}
        </button>)}
      </div>
    </div>
  );
};

export default React.memo(TabsComponent);
