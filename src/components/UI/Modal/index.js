import React, {Fragment} from 'react';
import './Modal.css';
import BackDrop from '../BackDrop';

const Modal  = (props) => {
    return (
        <Fragment>
            <BackDrop show={props.show} close={props.close} />
            <div className="Modal" 
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1': '0'
                }}
            >
                {props.children}
            </div>
        </Fragment>    
    );
};
export default Modal;