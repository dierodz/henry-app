import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "react-native-paper";

const UserImage = ({ photoUrl, givenName, familyName }) => {
  return (
    <>
      {photoUrl ? (
        <Avatar.Image size={24} source={photoUrl} />
      ) : (
        <Avatar.Text
          label={givenName[0].toUpperCase() + familyName[0].toUpperCase()}
        />
      )}
    </>
  );
};

UserImage.propTypes = {
  photoUrl: PropTypes.string,
  givenName: PropTypes.string.isRequired,
  familyName: PropTypes.string.isRequired,
};

export default UserImage;
