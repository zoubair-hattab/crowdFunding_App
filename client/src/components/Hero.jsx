import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdInsertPhoto } from 'react-icons/md';
import axios from 'axios';
const Hero = ({ titleData, createCompaign }) => {
  const [compaign, setCompaign] = useState({
    title: '',
    decription: '',
    amount: '',
    deadline: '',
  });
  const [image, setImage] = useState('');

  const createNewCompaign = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', image);
      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            pinata_api_key: process.env.REACT_APP_API_KEY,
            pinata_secret_api_key: process.env.REACT_APP_SECRET_KEY,
          },
        }
      );

      await createCompaign({
        ...compaign,
        image: `https://gateway.pinata.cloud/ipfs/${response?.data.IpfsHash}`,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeImage = async (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="relative">
      <span className="coverLine"></span>
      <img
        src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
        alt=""
        className="w-full h-full absolute top-0 left-0 object-cover inset-0"
      />
      <div className="relative inset-x-0 bottom-0 ">
        <svg
          className="absolute inset-x-0 bottom-0 text-white"
          viewBox="0 0 1160 163"
        >
          <path
            fill="currentColor"
            d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
          />
        </svg>
        <div
          className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl
        md:px-24 lg:px-8 lg:py-20
        "
        >
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-none">
                Crypto King <br className="hidden md:block" /> Crowd Funding
              </h2>
              <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                dolore voluptatem tenetur iste perspiciatis porro maxime facilis
              </p>
              <Link
                to="/"
                className="inline-flex items-center font-semibold tracking-wide transition-colors duration-200 text-teal-400 hover:text-teal-700"
              >
                Learn more
                <svg
                  className="inline-block w-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </Link>
            </div>
            <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
              <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                <h3 className="mb-4 text-gray-800 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                  Compaign
                </h3>
                <form onSubmit={(e) => createNewCompaign(e)}>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="firstName"
                      className=" text-gray-800 inline-block mb-1 font-medium"
                    >
                      Title
                    </label>
                    <input
                      onChange={(e) =>
                        setCompaign({ ...compaign, title: e.target.value })
                      }
                      placeholder="title"
                      required
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none
                      "
                      id="firstName"
                      name="firstName"
                    />
                  </div>

                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="lastName"
                      className=" text-gray-800 inline-block mb-1 font-medium"
                    >
                      Description
                    </label>
                    <textarea
                      onChange={(e) =>
                        setCompaign({
                          ...compaign,
                          description: e.target.value,
                        })
                      }
                      placeholder="description"
                      required
                      className="flex-grow w-full resize-none py-4 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none
                      "
                      id="lastName"
                      name="lastName"
                    />
                  </div>

                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="email"
                      className=" text-gray-800 inline-block mb-1 font-medium"
                    >
                      Target Amount
                    </label>
                    <input
                      onChange={(e) =>
                        setCompaign({
                          ...compaign,
                          amount: e.target.value,
                        })
                      }
                      placeholder="amount"
                      required
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none
                      "
                      id="email"
                      name="email"
                    />
                  </div>

                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="pasword"
                      className=" text-gray-800 inline-block mb-1 font-medium"
                    >
                      Deadline
                    </label>
                    <input
                      type="date"
                      onChange={(e) =>
                        setCompaign({
                          ...compaign,
                          deadline: e.target.value,
                        })
                      }
                      placeholder="deadline"
                      required
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none
                      "
                      id="lastName"
                      name="lastName"
                    />
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="file"
                      className=" text-gray-800 flex items-center gap-2 mb-1 font-medium"
                    >
                      Compaign Image
                      {image ? (
                        <img
                          src={URL.createObjectURL(image && image)}
                          alt=""
                          className="h-20 w-20 object-cover rounded-full border border-purple-500"
                        />
                      ) : (
                        <MdInsertPhoto size={30} className="text-gray-500" />
                      )}
                    </label>
                    <input
                      hidden
                      type="file"
                      onChange={handleChangeImage}
                      placeholder="Photo"
                      required
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none
                      "
                      id="file"
                    />
                  </div>
                  <div className="mt-4 mb-2 sm:mb-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition
                      duration-200 rounded shadow-md bg-purple-400 hover:bg-purple-700
                     focus:outline-none newColor "
                    >
                      Create Compaign
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 sm:text-sm">
                    Create your Compaign for raise funds
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
