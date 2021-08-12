import React from "react";
import {
  Modal,
  ScrollView,
  FormControl,
  VStack,
  Input,
  Button,
  Slide,
  HStack,
  Heading,
  Icon,
  IconButton,
  Alert,
} from "native-base";
import { useSelector } from "react-redux";
import { RootState } from "redux-store/store";
import * as yup from "yup";
import { useFormik } from "formik";
import { modalNewGroupShow } from "redux-store/slices/modals";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { createGroup } from "redux-store/slices/groups";
import { FlingGestureHandler, Directions } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

const schema = yup.object().shape({
  name: yup.string().required("Group name is required!"),
});

interface Props {}

const NewGroupModal: React.FC<Props> = (props) => {
  const show = useSelector((state: RootState) => state.modals.newGroup);
  const { error, loading } = useAppSelector((state) => state.groups);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: "",
    },
    onSubmit: async (values) => {
      dispatch(createGroup(values)).then(() =>
        dispatch(modalNewGroupShow(false))
      );
    },
  });

  const onClose = () => dispatch(modalNewGroupShow(false));

  return (
    <Slide in={show} placement="top">
      <FlingGestureHandler
        direction={Directions.UP}
        onActivated={(e) => onClose()}
      >
        <VStack space={5} shadow={5} p={5} backgroundColor="white">
          <HStack justifyContent="space-between">
            <Heading>Create Group</Heading>
            <IconButton
              variant="ghost"
              icon={<Icon as={Feather} name="x" />}
              onPress={onClose}
            />
          </HStack>
          {error && (
            <Alert status="error">
              <Alert.Icon />
              <Alert.Title>{error.message}</Alert.Title>
            </Alert>
          )}
          <FormControl isInvalid={!!formik.errors.name}>
            <FormControl.Label>Name</FormControl.Label>
            <Input
              value={formik.values.name}
              onChange={(e) => formik.setFieldValue("name", e.nativeEvent.text)}
              placeholder="Enter group name"
            />
            <FormControl.ErrorMessage>
              {formik.errors.name}
            </FormControl.ErrorMessage>
          </FormControl>
          <Button
            isLoading={loading.creating}
            onPress={() => formik.handleSubmit()}
          >
            Create Group
          </Button>
        </VStack>
      </FlingGestureHandler>
    </Slide>
  );
};

export default NewGroupModal;
