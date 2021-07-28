import { useNavigation, useRoute } from "@react-navigation/native";
import { Layout } from "components/common";
import { getList, updateList } from "lib/list";
import { VStack, FormControl, Input, Button, Alert } from "native-base";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { ListProp } from "utils/interfaces";

const schema = yup.object().shape({
  name: yup.string().required("List name is required!"),
});

interface Props {}

const UpdateList: React.FC<Props> = (props) => {
  const [data, setData] = useState<ListProp | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nav = useNavigation();
  const route = useRoute();
  const listId = route.params ? (route.params as any).listId : null;
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: data ? data.name : "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const res = await updateList(listId, {
        ...values,
      } as any);
      setLoading(false);
      if (res) {
        nav.goBack();
      } else {
        setError("Unable to update list!");
      }
    },
    enableReinitialize: true,
  });

  const handleGetList = async (listId: string) => {
    setData(await getList(listId));
  };

  useEffect(() => {
    if ((route.params as any).listId) {
      handleGetList((route.params as any).listId);
    }
  }, [route.params]);

  return (
    <Layout>
      <VStack space={10} m={5}>
        {error && (
          <Alert status="error">
            <Alert.Icon />
            <Alert.Title flexShrink={1}>{error}</Alert.Title>
          </Alert>
        )}
        <FormControl isInvalid={!!formik.errors.name}>
          <FormControl.Label
            _text={{ color: "muted.500", fontSize: "sm", bold: true }}
          >
            Name
          </FormControl.Label>
          <Input
            value={formik.values.name}
            onChange={(e) => formik.setFieldValue("name", e.nativeEvent.text)}
          />
          <FormControl.ErrorMessage>
            {formik.errors.name}
          </FormControl.ErrorMessage>
        </FormControl>

        <Button isLoading={loading} onPress={() => formik.handleSubmit()}>
          Update List
        </Button>
      </VStack>
    </Layout>
  );
};

export default UpdateList;
