import React, { useEffect, useState } from 'react';
import styles from './ToggleSwitch.module.css';
import { watchlist_tables } from '../../utils/constants/tables';
import { saveOrUpdateDataToFireStore } from '../../utils/helper/FireBaseHelper';
import { getIDB, updateIDB } from 'idbkeyvalue';
interface ToggleSwitchProps{
  name : string;
}

const ToggleSwitch = (props:ToggleSwitchProps) => {
  const {name} = props;
  const [isChecked, setIsChecked] = useState(false);
  const { wl_lists } = watchlist_tables; 
  
  useEffect(()=>{
    const fetchData = async()=>{
      let idbData = await getIDB(name, wl_lists);
      if(idbData && Object.keys(idbData).length > 0 && idbData.hasOwnProperty("isPublic") ){
        const { isPublic } = idbData; 
        setIsChecked(isPublic);  
      }
    }
    fetchData(); 
  }, [wl_lists,name])

  const handleChange = async() => {
    setIsChecked(!isChecked);
    let user = localStorage.getItem('user'); 
    let userData = user && JSON.parse(user); 
    if(!userData) return;
    let condition = {  email :  userData.email, name : name }
    saveOrUpdateDataToFireStore(wl_lists, { isPublic : !isChecked }, condition);
    let idbData = await getIDB(name, wl_lists);
    idbData = { ...idbData, isPublic : !isChecked }
    updateIDB(name,idbData,wl_lists); 
  };


  return (
    <div className={styles.container}>
      
      <label className={styles.switch}>
        <input 
          type="checkbox" 
          checked={isChecked} 
          onChange={handleChange}
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
      <span className="toggle-text">&nbsp;Make this watchlist as Public</span>
    </div>
  );
};

export default ToggleSwitch;
