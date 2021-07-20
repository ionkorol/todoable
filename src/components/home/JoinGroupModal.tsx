import { joinGroup } from "lib/group";
import { showJoinGroupModal } from "lib/modals";
import { VStack, FormControl, Input, Modal, Alert, Button } from "native-base";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux-store/store";
import * as yup from "yup";
import { useFormik } from "formik";

const schema = yup.object().shape({
  id: yup.string().required("ID is required!"),
});

const JoinGroupModal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const show = useSelector((state: RootState) => state.modals.joinGroup);
  const onClose = () => showJoinGroupModal(false);

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      id: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await joinGroup(values.id);
        if (res) {
          onClose();
        } else {
          setError("Unabel to join group!");
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    },
  });

  console.log(show);

  return (
    <Modal isOpen={show} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Join Group</Modal.Header>
        <Modal.Body>
          <VStack space={10} mt={5}>
            {error && (
              <Alert status="error">
                <Alert.Icon />
                <Alert.Title flexShrink={1}>{error}</Alert.Title>
              </Alert>
            )}
            <FormControl isInvalid={!!formik.errors.id}>
              <FormControl.Label
                _text={{ color: "muted.500", fontSize: "sm", bold: true }}
              >
                ID
              </FormControl.Label>
              <Input
                value={formik.values.id}
                onChange={(e) => formik.setFieldValue("id", e.nativeEvent.text)}
              />
              <FormControl.ErrorMessage>
                {formik.errors.id}
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button isLoading={loading} onPress={() => formik.handleSubmit()}>
            Join Group
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default JoinGroupModal;
