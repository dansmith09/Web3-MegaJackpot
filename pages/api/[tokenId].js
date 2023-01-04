export default function handler(req, res) {
    // get the tokenId from the query params
    const tokenId = req.query.tokenId;
    // Send metadata for NFT
    res.status(200).json({
      name: "TEST Proof of Persistence #" + tokenId,
      description: "If you have earned a Proof of Persistence NFT, you are a part of a small group of determined, gritty individuals who braved the cruel wrath of time, strategy and probability and came out victorious. You may now forever bask in the glory that this token brings. Congratulations…\n\nBut this is only the beginning...",
      image: "https://i.ibb.co/0FLKp86/PROOF-OF-PERSISTENCE.gif",
      attributes: [
        {
          "trait_type": "Index", 
          "value": tokenId
        }, 
        {
          "trait_type": "Achievement", 
          "value": "Completed MegaJackpot"
        }, 
        {
          "trait_type": "Developoooor", 
          "value": "BigSmith.eth"
        }, 
      ]
    });
  }