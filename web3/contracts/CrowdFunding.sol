pragma solidity ^0.8.9;
contract CrowdFunding{
    struct Compaign{
        address owner;
        string title;
        string description;
         uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address [] donators;
        uint256[] donations;
    }
    mapping(uint256=>Compaign) public compaigns;
    uint256 public numberOfCompaigns=0;
    function createComapin(address _owner,string memory _title,string memory _description,uint256 _target,uint256 _deadline,string memory _image) public returns (uint256){
        Compaign storage compaign=compaigns[numberOfCompaigns];
       require(compaign.deadline<block.timestamp,'The deadline should be a date in the future.');
        compaign.owner=_owner;
        compaign.title=_title;
        compaign.description=_description;
        compaign.target=_target;
        compaign.amountCollected=0;
        compaign.deadline=_deadline;
        compaign.image=_image;
        numberOfCompaigns++;
        return numberOfCompaigns-1;
    }
    function donationToCompaign(uint256 compaignId ) public payable{
        Compaign storage compaign=compaigns[compaignId];
        compaign.donators.push(msg.sender);
        compaign.donations.push(msg.value);
        (bool sent,)=payable(compaign.owner).call{value:msg.value}("");
        if(sent){
           compaign. amountCollected+=msg.value;
        }

    }
    function getDonators(uint256 _id)view public returns(address[] memory,uint256 [] memory ){
        return (compaigns[_id].donators,compaigns[_id].donations);
    }
    function getCompaigns()  public view returns (Compaign [] memory){
       Compaign [] memory allCompaing=new Compaign[](numberOfCompaigns);
       for(uint256 i=0;i<numberOfCompaigns;i++){
       Compaign storage item=compaigns[i];
       allCompaing[i]=item;
       }
       return allCompaing;


    }
}