import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import * as ProgressApi from "lib/progressApi";

import { Feather } from "@expo/vector-icons";
import { HStack, Input, Icon, IconButton } from "native-base";
import { useSelector } from "react-redux";
import { RootState } from "redux-store/store";

const schema = yup.object().shape({
  description: yup.string().required("Required"),
});

interface Props {}

const ProgressAdd: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const { error } = useSelector((state: RootState) => state.progress);

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setLoading(true);
      ProgressApi.createProgress("", values);
      setLoading(false);
    },
  });

  return (
    <HStack space={3}>
      <Input
        value={formik.values.description}
        onChange={(e) =>
          formik.setFieldValue("description", e.nativeEvent.text)
        }
        InputLeftElement={
          <Icon as={Feather} name="plus" color="primary.100" size="sm" ml={2} />
        }
        placeholder="Enter your progress"
        borderWidth={2}
        flex={1}
      />

      <IconButton
        icon={<Icon color="#fff" as={<Feather name="arrow-up-circle" />} />}
        onPress={() => formik.handleSubmit()}
        isLoading={loading}
        isLoadingText={undefined}
      />
    </HStack>
  );
};

export default ProgressAdd;
