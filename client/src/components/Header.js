import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

function Header () {

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                <img
                    alt=""
                    src="../logo.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                
                Appneta
                </Navbar.Brand>
            </Navbar>        
        </div>
      )
}

export default Header;