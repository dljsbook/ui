import * as React from 'react';
import { css } from 'emotion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUndo,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'

interface IProps {
  back?: (e: React.MouseEvent<HTMLElement>) => void;
  reset?: (e: React.MouseEvent<HTMLElement>) => void;
}

const headerClass = css`
  height: 25px;
  background: rgba(0,0,0,0.05);
  margin-bottom: 15px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  font-size: 13px;

  span, svg {
    margin: 0 5px 0 0;
    color: rgba(0,0,0,0.5);
  }

  a {
    color: rgba(0,0,0,0.5);
    cursor: pointer;
  }
`;

const leftClass = css`
  text-align: left;
  flex: 1;
`;

const rightClass = css`
  text-align: right;
  flex: 1;
`;

const disabledClass = css`
  opacity: 0.3;
`;


const Header: React.SFC<IProps> = ({
  back,
  reset,
}) => (
  <div className={headerClass}>
    <div className={leftClass}>
      <a className={back === undefined ? disabledClass : undefined} onClick={back}>
        <FontAwesomeIcon icon={faChevronLeft} />
        Back
      </a>
    </div>
    <div className={rightClass}>
      <a className={reset === undefined ? disabledClass : undefined} onClick={reset}>
        <FontAwesomeIcon icon={faUndo} />
        Reset
      </a>
    </div>
  </div>
);
export default Header;
