/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { NavBar, Footer, Hero, PupUp, Card } from '../components/index';
import { CrowdFundingContext } from '../context/corwdFunding';

const HomePage = () => {
  const {
    titleData,
    getCompaigns,
    createCompaign,
    donate,
    getUserCompaigns,
    getDonation,
  } = useContext(CrowdFundingContext);
  const [allCompaign, setAllCompaign] = useState();
  const [userCompaign, setUserCompaign] = useState();
  useEffect(() => {
    const loadData = async () => {
      const compaigns = await getCompaigns();
      setAllCompaign(compaigns);
      const userCompaigns = await getUserCompaigns();
      setUserCompaign(userCompaigns);
    };
    loadData();
  }, []);
  // donate popup model
  const [openModel, setOpenModel] = useState(false);
  const [donateCompaign, setDonateCompaign] = useState();
  return (
    <div>
      <NavBar />
      <Hero titleData={titleData} createCompaign={createCompaign} />
      <Card
        title="All List Compaign"
        allCompaign={allCompaign}
        setOpenModel={setOpenModel}
        setDonate={setDonateCompaign}
      />
      <Card
        title="Your Created Compaign"
        allCompaign={userCompaign}
        setOpenModel={setOpenModel}
        setDonate={setDonateCompaign}
      />
      <Footer />
      {openModel && (
        <PupUp
          setOpenModel={setOpenModel}
          getDonations={getDonation}
          donate={donateCompaign}
          donationFunction={donate}
        />
      )}
    </div>
  );
};

export default HomePage;
