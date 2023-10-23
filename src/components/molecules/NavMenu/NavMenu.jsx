import React from 'react'
import icon from '../../../assets/image/postShere.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

export const NavMenu = ({ signOut, name }) => {
    return (
        <nav className="navbar navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <img src={icon} alt="" width={60} height={60}/>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="offcanvas offcanvas-end text-bg-dark" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">{name}</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>

                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <NavLink to={'/contactos'} className="nav-link active">Muro</NavLink>
                            </li>
                            <br />
                            <li className="nav-item d-grid gap-2 col-6 mx-auto">
                                <button className="btn btn-secondary" type="submit" onClick={signOut}>
                                    Cerrar sesión 
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
