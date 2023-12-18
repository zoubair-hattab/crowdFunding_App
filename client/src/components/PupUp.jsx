/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

const PupUp = ({ setOpenModel, donate, donationFunction, getDonations }) => {
  const [amount, setAmount] = useState();
  const [allDonationDate, setAllDonationData] = useState();
  const createDonation = async () => {
    try {
      await donationFunction(donate?.pid, amount);
    } catch (error) {
      console.log('something wrong!');
    }
  };
  useEffect(() => {
    const loadData = async () => {
      const donationListData = await getDonations(donate?.pid);
      setAllDonationData(donationListData);
    };
    loadData();
  }, []);
  return (
    <>
      <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{donate.title}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setOpenModel(false)}
              >
                <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                  x
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                {donate.description}
              </p>
              <input
                type="number"
                placeholder="amount"
                required
                className="flex-grow w-full h-12 px-4 mb-2 transition-all duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:border-purple-400"
                onChange={(e) => setAmount(e.target.value)}
              />
              {allDonationDate?.map((donate, i) => (
                <p
                  className="my-4 text-slate-500 text-lg leading-relaxed"
                  key={i + 1}
                >
                  {i + 1}:<span className="text-red-500">ETH:</span>
                  {donate.donation}{' '}
                  <span className="text-red-500">Donator:</span>
                  {donate.donator.slice(0, 35)}
                </p>
              ))}
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-state-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-200"
                type="button"
                onClick={() => setOpenModel(false)}
              >
                Close
              </button>
              <button
                className="text-white background rounded shadow font-bold uppercase active:bg-emerald-600 px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-200"
                type="button"
                onClick={() => createDonation()}
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-bold bg-black"></div>
    </>
  );
};

export default PupUp;
