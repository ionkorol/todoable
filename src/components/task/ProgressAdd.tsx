import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { createProgress } from "lib/task/progress";

import { Feather } from "@expo/vector-icons";
import { HStack, Input, Icon, IconButton } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const schema = yup.object().shape({
  description: yup.string().required("Required"),
});

interface Props {
  taskId: string;
}

const ProgressAdd: React.FC<Props> = (props) => {
  const { taskId } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await createProgress(taskId, values as any);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    },
  });

  return (
    <HStack space={5}>
      <Input
        value={formik.values.description}
        onChange={(e) =>
          formik.setFieldValue("description", e.nativeEvent.text)
        }
        InputLeftElement={
          <Icon
            as={<Feather name="user" />}
            color="muted.500"
            size="sm"
            ml={2}
          />
        }
        placeholder="Enter your progress"
        variant="filled"
        size="sm"
        flex={1}
      />

      <IconButton
        size="sm"
        icon={<Icon color="success.500" as={<Feather name="plus" />} />}
        onPress={() => formik.handleSubmit()}
        isLoading={loading}
        isLoadingText={undefined}
      />
    </HStack>
  );
};

export default ProgressAdd;
