import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Layout } from "components/common";
import * as listActions from "redux-store/slices/lists";
import {
  VStack,
  FormControl,
  Input,
  Button,
  Alert,
  Icon,
  Pressable,
  ScrollView,
  Flex,
} from "native-base";
import React, { useCallback } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Feather } from "@expo/vector-icons";
import { OurPressable } from "components/ui";

const schema = yup.object().shape({
  name: yup.string().required("List name is required!"),
  icon: yup.string().required("Icon is required!"),
  color: yup.string().required("Color is required!"),
});

interface Props {}

const COLORS = [
  "rose",
  "pink",
  "fuchsia",
  "blue",
  "lightBlue",
  "cyan",
  "teal",
  "emerald",
  "green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "red",
];

const ICONS = [
  "bar-chart",
  "bell",
  "book",
  "briefcase",
  "calendar",
  "clipboard",
  "list",
  "clock",
  "coffee",
];

const ListAction: React.FC<Props> = (props) => {
  const { loading, error } = useAppSelector((state) => state.lists);
  const { params } = useRoute();
  const list = params ? (params as any).id : null;
  const data = useAppSelector((state) =>
    state.lists.lists.find((item) => item.id === list)
  );
  const nav = useNavigation();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: data ? data.name : "",
      icon: data ? data.icon : ICONS[0],
      color: data ? data.color : COLORS[0],
    },
    onSubmit: async (values) => {
      if (data) {
        await dispatch(listActions.updateList(values));
      } else {
        await dispatch(listActions.createList(values));
      }
      nav.goBack();
    },
    enableReinitialize: true,
  });

  useFocusEffect(
    useCallback(() => {
      nav.setOptions({
        title: data ? "Edit List" : "New List",
        headerRight: () => (
          <Button
            variant="ghost"
            _text={{ fontSize: "xl" }}
            onPress={() => formik.handleSubmit()}
          >
            {data ? "Save" : "Create"}
          </Button>
        ),
      });
    }, [])
  );

  return (
    <Layout>
      <ScrollView>
        <VStack space={10} m={5}>
          {error && (
            <Alert status="error">
              <Alert.Icon />
              <Alert.Title flexShrink={1}>{error.message}</Alert.Title>
            </Alert>
          )}

          <FormControl isInvalid={!!formik.errors.name}>
            <FormControl.Label>Name</FormControl.Label>
            <Input
              value={formik.values.name}
              onChangeText={formik.handleChange("name")}
            />
            <FormControl.ErrorMessage>
              {formik.errors.name}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formik.errors.color}>
            <FormControl.Label>Color</FormControl.Label>
            <Flex flexDirection="row" flexWrap="wrap" justifyContent="center">
              {COLORS.map((item) => (
                <OurPressable
                  onPress={() => formik.setFieldValue("color", item)}
                  backgroundColor={`${item}.500`}
                  m={1}
                  p={5}
                  borderRadius={10}
                  borderWidth={2}
                  borderColor={
                    formik.values.color === item ? "primary.500" : "white"
                  }
                  key={item}
                />
              ))}
            </Flex>

            <FormControl.ErrorMessage>
              {formik.errors.color}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formik.errors.icon}>
            <FormControl.Label>Icons</FormControl.Label>
            <Flex flexDirection="row" flexWrap="wrap" justifyContent="center">
              {ICONS.map((item) => (
                <Pressable
                  onPress={() => formik.setFieldValue("icon", item)}
                  backgroundColor={
                    formik.values.icon === item
                      ? `${formik.values.color}.200`
                      : "primary.50"
                  }
                  m={2}
                  p={2}
                  borderRadius={10}
                  key={item}
                >
                  <Icon
                    as={Feather}
                    name={item}
                    color={
                      item === formik.values.icon
                        ? `${formik.values.color}.500`
                        : undefined
                    }
                  />
                </Pressable>
              ))}
            </Flex>

            <FormControl.ErrorMessage>
              {formik.errors.icon}
            </FormControl.ErrorMessage>
          </FormControl>

          <Button
            isLoading={loading.creating}
            onPress={() => formik.handleSubmit()}
          >
            Create List
          </Button>
        </VStack>
      </ScrollView>
    </Layout>
  );
};

export default ListAction;
