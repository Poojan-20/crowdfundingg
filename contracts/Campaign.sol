// SPDX-License-Identifier: Unlicensed
pragma solidity >0.7.0 <= 0.9.0;


contract campaignFactory{

    address [] public deployedCampaigns;

    event campaignCreated(
        string title,
        uint rAmt,
        address indexed owner,
        address campaignAddress,
        string imgURI,
        uint indexed timestamp,
        string indexed category
    );
    
    function createCampaign(
        string memory campaignTitle,
        uint requiredAmount,
        string memory imgURI,
        string memory storyURI,
        string memory category
        ) public
    {
        campaign newCampaign = new campaign(
            campaignTitle, requiredAmount,imgURI, storyURI
        );

        deployedCampaigns.push(address(newCampaign));

        emit campaignCreated(
        campaignTitle,
        requiredAmount,
        msg.sender,
        address(newCampaign),
        imgURI,
        block.timestamp,
        category
        );

    }
}


contract campaign{
    string public title;
    uint public requiredAmount;
    string public image;
    string public story;
    address payable public owner;
    uint public receivedAmount;

    event donateEvent(address indexed donor, uint indexed amount, uint indexed timeStamp);

    constructor(
        string memory campaignTitle,
        uint rAmt,
        string memory imgURI,
        string memory storyURI
    ){
        title = campaignTitle;
        requiredAmount = rAmt;
        image = imgURI;
        story = storyURI;
        owner = payable(msg.sender);
    }

    function donate() public payable {
        require(requiredAmount > receivedAmount, "Amount fulfilled");
        owner.transfer(msg.value);
        receivedAmount += msg.value;
        emit donateEvent(msg.sender, msg.value, block.timestamp);
    }

}