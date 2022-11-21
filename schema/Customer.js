const { Text, Relationship, Checkbox } = require("@keystonejs/fields");
const access = require("../access.control");
const { imageSet } = require("./ImageCloud");

const orgImgAdapter = imageSet("Flashloans");
const { CloudinaryImage } = require("@keystonejs/fields-cloudinary-image");
const UserProfile = {
  fields: {
    address: {
      type: Text,
      isUnique: true,
    },
    nickname: {
      type: Text,
    },
    referralCode: {
      type: Text,
    },
    referrals: {
      type: Relationship,
      ref: "Referral",
    },
    avatar: {
      type: Relationship,
      ref: "Image",
    },
    history: {
      type: Relationship,
      ref: "History",
    },
    statusReferral: {
      type: Checkbox,
    },
  },
  // List-level access controls
  access: {
    read: true,
    // read: access.userIsAdmin,
    update: true,
    create: true,
    delete: access.userIsAdmin,
  },
};

module.exports = UserProfile;
