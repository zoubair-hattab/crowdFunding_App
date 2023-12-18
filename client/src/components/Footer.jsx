import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const ProductList = ['Market', 'ERC20 Token', 'Donation'];
  const contactList = [
    'support@cryptoking.com',
    'info@info.com',
    'example@example.com',
  ];
  const usefullLink = ['Home', 'About US', 'Company id'];
  return (
    <footer className="text-center text-white backgroundMain lg:text-left ">
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h6
              className="text-white uppercase mb-4 flex items-center justify-center font-semibold
              md:justify-start
            
            "
            >
              crypto King
            </h6>
            <p className="text-white">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit sit amet
              consectetur adipisicing elit
            </p>
          </div>
          <div className="">
            <h6
              className="text-white uppercase mb-4 flex items-center justify-center font-semibold
 md:justify-start"
            >
              Products
            </h6>

            {ProductList?.map((item, i) => (
              <p className="mb-4" key={i + 1}>
                <Link to={`/${item}`}>{item}</Link>
              </p>
            ))}
          </div>
          <div className="">
            <h6
              className="text-white uppercase mb-4 flex items-center justify-center font-semibold
 md:justify-start"
            >
              usefullLink
            </h6>

            {usefullLink?.map((item, i) => (
              <p className="mb-4" key={i + 1}>
                <Link to={`/${item}`}>{item}</Link>
              </p>
            ))}
          </div>
          <div className="">
            <h6
              className="text-white uppercase mb-4 flex items-center justify-center font-semibold
 md:justify-start"
            >
              contact
            </h6>

            {contactList?.map((item, i) => (
              <p className="mb-4" key={i + 1}>
                <Link to={`/${item}`}>{item}</Link>
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="backgroundMain p-6 text-center">
        <span>&copy; Copytrigth:</span>
        <Link className="font-semibold">Crypto King</Link>
      </div>
    </footer>
  );
};

export default Footer;
