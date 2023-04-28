import { Feather } from "@expo/vector-icons";
import { Menu, IconButton, Icon, Button } from "native-base";
import React, { FC } from "react";

interface Props {
  menu: {
    title: string;
    onPress: () => void;
    icon?: any;
    color?: string;
  }[];
}

const OptionMenu: FC<Props> = ({ menu }) => {
  return (
    <Menu
      trigger={(triggerProps) => {
        return (
          <IconButton
            variant="link"
            icon={<Icon as={Feather} size="md" name="more-vertical" />}
            accessibilityLabel="More options menu"
            {...triggerProps}
          />
        );
      }}
    >
      {menu.map((item, index) => (
        <Menu.Item onPress={item.onPress} key={index}>
          <Button
            justifyContent="flex-start"
            p={0}
            size="sm"
            variant="unstyled"
            startIcon={item.icon}
            _text={{ color: item.color }}
          >
            {item.title}
          </Button>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default OptionMenu;
