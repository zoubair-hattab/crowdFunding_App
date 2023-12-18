import React from 'react';
import { Link } from 'react-router-dom';
const Card = ({ allCompaign, setOpenModel, setDonate, title }) => {
  const daysLeft = (dealine) => {
    const diffrence = new Date(dealine).getTime() - Date.now();
    return (diffrence / (1000 * 3600 * 24)).toFixed(0);
  };
  console.log(process.env.REACT_APP_PRIVATE_KEY);
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <p className="py-16 text-2xl font-bold leading-5">{title}</p>
      <div className="grid gap-5 lg:grid-cols-3 sm:mx-auto lg:max-w-full">
        {allCompaign?.map((compaign, i) => (
          <div
            onClick={() => (setDonate(compaign), setOpenModel(true))}
            key={i + 1}
            className="cursor-pointer border overflow-hidden transition-shadow duration-200 bg-white rounded"
          >
            <img
              src={compaign?.image}
              alt=""
              className="object-cover w-full h-64 rounded"
            />
            <div className="py-5 pl-2">
              <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">
                Days Left: {daysLeft(compaign?.deadline)}
              </p>
              <Link
                to="/"
                aria-label="Article"
                className="inline-block mb-3 text-black transition-colors 
                duration-200 hover:text-purple-700"
              >
                <p className="text-2xl font-bold leading-5">
                  {compaign?.title}
                </p>
              </Link>
              <p className="mb-4 text-gray-700">{compaign?.title}</p>
              <div className="flex space-x-4">
                <p className="font-semibold">Target: {compaign?.target} ETH</p>
                <p className="font-semibold">
                  Raised: {compaign?.amountCollected} ETH
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
