import React from 'react';
import './footer.css';
import Logo from '../Logo/Logo';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__content">
                    <div className="footer__logo">
                        <Logo />
                        <span>
                            © «Развлекательные посты» {new Date().getFullYear()}
                        </span>
                    </div>
                    <div className="footer__contact">
                        <h4>Проект создан:</h4>
                        <a
                            href="https://github.com/Kalliacto"
                            className="footer__contact_link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Боронина Карина
                        </a>
                        <a
                            href="https://github.com/AndreyKapturin"
                            className="footer__contact_link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Каптурин Андрей
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
