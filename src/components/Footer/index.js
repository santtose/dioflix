import React from 'react';
import { Link } from 'react-router-dom';
import { FooterBase } from './styles';
import Logo from '../../assets/img/logoDioFlix.png';

function Footer() {
  return (
    <FooterBase>
      <Link to="/">
        <img src={Logo} alt="Logo dioflix" style={{ width: '100px' }} />
      </Link>
    </FooterBase>
  );
}

export default Footer;
