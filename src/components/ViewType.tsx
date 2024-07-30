import React, { FC, HTMLAttributes, useState } from 'react';
import Image from './common/Image';
import ToggleSwitch from './common/ToggleSwitch';
interface ViewTypeProps extends HTMLAttributes<HTMLDivElement> {
  onChangeViewType: (viewType: string) => void;
  type:string
  title : string
}

const ViewType: FC<ViewTypeProps> = ({ type, title, onChangeViewType, ...rest }) => {
  const [activeViewType, setActiveViewType] = useState('grid');

  const handleClick = (viewType: string) => {
    setActiveViewType(viewType);
    onChangeViewType(viewType);
  };

  const activeStyle = {
    color: '#FFB443',
    background: '#353510',
  };

  return (
      <div className="view-content">
      {
          type === 'watchlistMovie' ? <>
          <button
          className="toggle-btn"
          type="button"
        >
        <ToggleSwitch name={title}/>
        </button>&nbsp; &nbsp; </>
        : ""
        }

        <button
          type="button"
          style={activeViewType === 'grid' ? activeStyle : {}}
          onClick={() => handleClick('grid')}
        >
         <Image src={activeViewType === 'grid' ? "/assets/images/SquaresFour-r.svg" : "/assets/images/SquaresFour-r-1.svg"} style={{padding : '0 0 4px 0'}}/> Grid View
        </button>&nbsp; &nbsp;
        <button
          type="button"
          style={activeViewType === 'list' ? activeStyle : {}}
          onClick={() => handleClick('list')}
        >
          <Image src={activeViewType === 'list' ? "/assets/images/ListBullets-r.svg" : "/assets/images/ListBullets-r-1.svg"} style={{padding : '0 0 4px 0'}}/> List View
        </button>
        
      </div>
  );
};

export default ViewType;
