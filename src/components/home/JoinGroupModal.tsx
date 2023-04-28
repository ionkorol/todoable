import {
  VStack,
  FormControl,
  Input,
  Modal,
  Alert,
  Button,
  Slide,
  HStack,
  Heading,
  IconButton,
  Icon,
} from "native-base";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux-store/store";
import * as yup from "yup";
import { useFormik } from "formik";
import { modalJoinGroupShow } from "redux-store/slices/modals";
import { joinGroup, updateGroup } from "redux-store/slices/groups";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { FlingGestureHandler, Directions } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

const schema = yup.object().shape({
  id: yup.string().required("ID is required!"),
});

const JoinGroupModal = () => {
  const show = useSelector((state: RootState) => state.modals.joinGroup);
  const { error, loading } = useAppSelector((state) => state.groups);
  const dispatch = useAppDispatch();
  const onClose = () => dispatch(modalJoinGroupShow(false));

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      id: "",
    },
    onSubmit: async (values) => {
      dispatch(joinGroup(values.id)).then(() =>
        dispatch(modalJoinGroupShow(false))
      );
    },
  });

  return (
    <Slide in={show} placement="top">
      <FlingGestureHandler
        direction={Directions.UP}
        onActivated={(e) => onClose()}
      >
        <VStack space={5} backgroundColor="white" shadow={5} p={5}>
          <HStack justifyContent="space-between">
            <Heading>Join Group</Heading>
            <IconButton
              variant="ghost"
              icon={<Icon as={Feather} name="x" />}
              onPress={onClose}
            />
          </HStack>
          {error && (
            <Alert status="error">
              <Alert.Icon />
              <Alert.Title flexShrink={1}>Unable to join group!</Alert.Title>
            </Alert>
          )}
          <FormControl isInvalid={!!formik.errors.id}>
            <FormControl.Label>ID</FormControl.Label>
            <Input
              value={formik.values.id}
              onChange={(e) => formik.setFieldValue("id", e.nativeEvent.text)}
              placeholder="Enter group ID"
            />
            <FormControl.ErrorMessage>
              {formik.errors.id}
            </FormControl.ErrorMessage>
          </FormControl>
          <Button
            isLoading={loading.updating}
            onPress={() => formik.handleSubmit()}
          >
            Join Group
          </Button>
        </VStack>
      </FlingGestureHandler>
    </Slide>
  );
};

export default JoinGroupModal;
