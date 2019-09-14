import React from 'react';
import './Backdrop.css';

const BackDrop = (props) => (
    props.show ? <div className="BackDrop" onClick={()=> props.close(false) } >X</div> : null
);
export default BackDrop;
