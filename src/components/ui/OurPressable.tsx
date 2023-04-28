import { Factory } from "native-base";
import { IPressableProps } from "native-base/lib/typescript/components/primitives";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native";

interface Props extends IPressableProps {}

const OurPressable: FC<Props> = (props) => {
  const FactoryOpacity = Factory(TouchableOpacity);

  return <FactoryOpacity {...props}>{props.children}</FactoryOpacity>;
};

export default OurPressable;
