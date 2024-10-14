import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';

const ReactSidebar = ({ sidebarItems, onClick }) => {
  const location = useLocation();

  const renderMenuItems = (items) => {
    return items.map((item) => {
      const isActive = location.pathname === item.url;

      if (item.children && item.children.length > 0) {
        return (
          <SubMenu
            className='fs-15 text-bolder'
            active={isActive}
            rootStyles={{
              backgroundColor: '#FFFFFF', // Keep the background color unchanged
              color: "black",
            }}
            key={item.id}
            title={item.label}
            label={item.label}
            icon={item.icon}
          >
            {renderMenuItems(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Link
            className='textDecoration-none color-white'
            to={item.url}
            style={{ textDecoration: 'none' }}
            key={item.id}
          >
            <MenuItem
              onClick={onClick}
              className='fs-15 text-bolder'
              active={isActive}
              rootStyles={{
                backgroundColor: isActive ? '#D9E0D9' : '#FFFFFF', // Background color for active state
                color: isActive ? '#009D63' : 'black', // Active text color set to #009D63
                border: isActive ? '2px solid black' : 'none', // Set border to black for active item
                width: "260px"
              }}
              icon={item.icon}
            >
              {item.label}
            </MenuItem>
          </Link>
        );
      }
    });
  };

  return (
    <div className="sidebar-container">
      <Sidebar
        backgroundColor='#FFFFFF'
        rootStyles={{
          backgroundColor: '#313947',
          color: 'white',
          fontWeight: 'bolder',
          width: '100%',
          height: "100%",
        }}
      >
        <div className="menu-title mt-5 mb-2" style={{ textAlign: 'center', marginBottom: '10px', color: "black", fontSize: "30px" }}>
          YOGA
        </div>
        <div className="menu-container">
          <Menu iconShape='circle'>{renderMenuItems(sidebarItems)}</Menu>
        </div>
      </Sidebar>
    </div>
  );
};

export default ReactSidebar;
