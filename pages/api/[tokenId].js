export default function handler(req, res) {
    // get the tokenId from the query params
    const tokenId = req.query.tokenId;
    // Gets the OGness for trait
    let OGness = 'Standard';
    if(tokenId < 5) {
      OGness = 'First 5!'
    } else if (OGness > 10) {
      OGness = 'First 10!'
    } else if (OGness > 20) {
      OGness = 'First 20!'
    } else if (OGness > 50) {
      OGness = 'First 50!'
    } else if (OGness > 100) {
      OGness = 'First 100!'
    } else if (OGness > 250) {
      OGness = 'First 250!'
    } else if (OGness > 1000) {
      OGness = 'First 1000!'
    }

    res.status(200).json({
      name: "Proof of Persistence #" + tokenId,
      description: "If you have earned a Proof of Persistence NFT, you are a part of a small group of determined, gritty individuals who braved the cruel wrath of time, strategy and probability and came out victorious. You may now forever bask in the glory that this token brings. Congratulations…\n\nBut this is only the beginning...",
      image: "https://i.ibb.co/0FLKp86/PROOF-OF-PERSISTENCE.gif",
      attributes: [
        {
          "trait_type": "Index", 
          "value": tokenId
        }, 
        {
          "trait_type": "OG Level", 
          "value": OGness
        }, 
        {
          "trait_type": "Achievement", 
          "value": "Completed MegaJackpot"
        }, 
      ]
    });
  }