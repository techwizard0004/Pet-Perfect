import React from 'react';
import "../Styles/Header.css";
import Logo from "../Assets/logo.png";

import { faBars, faUser, faBagShopping, faUserPlus, faXmarkSquare, faHomeUser, faHistory, faCartPlus, faRightFromBracket, faUserCircle, faListCheck, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink } from 'react-router-dom';

function Header() {

    const toggleMenu = (state: boolean) => {
        let menu: HTMLElement = document.getElementById("navbar") as HTMLElement;
        if (state) {
            menu.classList.add("menuOpen");
        } else {
            menu.classList.remove("menuOpen");
        }
    }

    return (
        <div>
            <header>
                <FontAwesomeIcon icon={faBars} onClick={() => toggleMenu(true)} id="bars" />
                <NavLink to="/home"><img src={Logo} alt="Logo" /></NavLink>
                <div className="prfhld">
                    <FontAwesomeIcon icon={faUserCircle} id="avater-header" />
                </div>
            </header>
            <nav id="navbar">
                <div className="crshld">
                    <FontAwesomeIcon icon={faXmarkSquare} id="cross" onClick={() => toggleMenu(false)} />
                </div>
                <ul className="d-flex flex-column align-items-center">
                    <li><NavLink to="/home" onClick={() => toggleMenu(false)}><FontAwesomeIcon icon={faHomeUser} /> Home</NavLink></li>
                    <li><NavLink to="/login" onClick={() => toggleMenu(false)}><FontAwesomeIcon icon={faRightFromBracket} /> Login</NavLink></li>
                    <li><NavLink to="/register" onClick={() => toggleMenu(false)}><FontAwesomeIcon icon={faRightFromBracket} /> Signup</NavLink></li>
                    <li><NavLink to="/profile" onClick={() => toggleMenu(false)}><FontAwesomeIcon icon={faUserCircle} /> Profile</NavLink></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header