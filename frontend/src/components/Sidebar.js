import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className={`sidebar ${open ? 'open' : ''}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className="sidebar-menu">
        <Link to="https://www.youtube.com/@shashwatgautam8108" target="_blank" >
          <span>YOUTUBE</span>
        </Link>
        <Link to="https://www.instagram.com/_shashwat.gautam_1605/" target="_blank">
          <span>INSTAGRAM</span>
        </Link>
        <Link to="https://github.com/ShashwatG16" target="_blank" >
          <span>GITHUB</span>
        </Link>
        <Link to="mailto:example@example.com">
          <span>E-Mail</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;



