import React from 'react';
import './styles.scss'

const Footer = () => {
    return (
        <footer className="footer section footer-classic context-dark bg-image">
            <div className="container">
                <div className="row row-30">
                    <div className="col-md-4 col-xl-5">
                        <div className="pr-xl-4">
                            <p>FF Service</p>
                            <p className="rights"><span>©  </span><span
                                className="copyright-year">2020</span><span> </span><span>"RENT RUSSIA" LLC</span><span>. </span><span>Все права защищены.</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4 col-xl-5">
                        <p>Контакт для отзывов и предложений <a href="mailto:brgmn@icloud.com">brgmn@icloud.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
