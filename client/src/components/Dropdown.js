import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react'
import '../App.css';

const Dropdown = props => {

  const { onItemSelect, defaultIndex } = props;

  const [showDropdown, setShowDropdown] = useState(false);

  const defaultFilters = {apply: false, isDefault: true, species: [], catchDate: 'ALL'};

  const [selectedIndex, setSelectedIndex] = useState(defaultIndex ? defaultIndex : 0 )
  // toggle show and hide for dropdown menu
  const toggleDropdown = e => {
    // stop the event from propagating or it will immediately trigger our document clickhandler and keep itself closed
    e.stopPropagation();
    e.preventDefault();
    if (showDropdown === false) {
      setShowDropdown(() => true);
      document.addEventListener('click', closeFilterMenu);
    } else {
      closeFilterMenu();
    }
  }

  const closeFilterMenu = () => {
    console.log('close click handler')
    setShowDropdown(false);
    document.removeEventListener('click', closeFilterMenu);
  };
  
  // pass our event to the onItemSelect callback if present in props
  const handleItemSelect = e => {
    if (onItemSelect) {
      onItemSelect(e);
    }
  };


  return (
    <div className='dropdown-menu' style={{...props.style, position: 'relative'}}>
      <button onClick={toggleDropdown}>
        <span>{props.items[selectedIndex]}</span> 
        <Icon style={{marginRight: '0px', marginLeft: 'auto'}} size='small' name='triangle down'/></button>
        <ul className='species-list' style={{display: showDropdown ? 'block' : 'none', position: 'absolute', width: 150}}>
          {props.items.map((item, index) => (
            <li key={item}>
              <button className='species-button' name={item} onClick={(e) => {setSelectedIndex(index); handleItemSelect(e)}} className='species-button'>
                {item}
              </button>                    
            </li>
          ))}      
        </ul>
    </div>  
  );

};



export default Dropdown;