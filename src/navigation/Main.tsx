import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { connect } from "react-redux";
import { RootState } from "redux-store/store";
import { UserProp } from "utils/interfaces";
import AuthNavigation from "./Auth";
import HomeNavigation from "./Home";

interface Props {
  data: UserProp | null;
}

const Main: React.FC<Props> = (props) => {
  const { data } = props;

  return (
    <NavigationContainer>
      {data ? <HomeNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

const mapState = (state: RootState) => ({
  data: state.user.data,
});

export default connect(mapState)(Main);
