import { Entypo } from "@expo/vector-icons";
import { Avatar, Icon } from "native-base";
import React from "react";

const UserAvatar = () => {
  return (
    <Avatar backgroundColor="muted.100" borderRadius={50}>
      <Icon as={Entypo} name="user" />
    </Avatar>
  );
};

export default UserAvatar;
