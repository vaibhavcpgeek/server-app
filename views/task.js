const inviteUser = async (req, res) => {
  const invitationBody = req.body;
  const shopId = req.params.shopId;
  const authUrl = "https://url.to.auth.system.com/invitation";

  try {
    const invitationResponse = await superagent
      .post(authUrl)
      .send(invitationBody);

    const { status, body } = invitationResponse;
    const { invitationId, authId } = body;

    const query = { authId: invitationResponse.body.authId };
    const update = {
      authId,
      email: invitationBody.email,
    };
    const options = {
      upsert: true,
      new: true,
    };

    const callback = (errInUser, createdUser) => {
      // request must contains shopId
      Shop.findById(shopId).exec((errInShop, shop) => {
        if (errInShop || !shop) {
          return res
            .status(400) // It should return status 400 (not 500) if shopId not found.
            .send(errInShop || { message: "No shop found" });
        }
        // Add users in shop db if not already present
        if (!shop.invitations.includes(invitationId)) {
          shop.invitations.push(invitationId);
        }
        if (!shop.users.includes(createdUser._id)) {
          shop.users.push(createdUser);
        }
        shop.save();
      });
    };

    if (status === 201) {
      User.findOneAndUpdate(query, update, options, callback);
    } else if (status === 200) {
      res.status(400).json({
        error: true,
        message: "User already invited to this shop",
      });
      return;
    }
    res.json(invitationResponse);
  } catch (err) {
    console.log(err);
  }
};

module.exports = inviteUser;
