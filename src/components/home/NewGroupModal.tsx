import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  FormControl,
  VStack,
  Input,
  Button,
} from "native-base";
import { useSelector } from "react-redux";
import { RootState } from "redux-store/store";
import { createGroup } from "lib/group";
import * as yup from "yup";
import { showNewGroupModal } from "lib/modals";
import { useFormik } from "formik";

const schema = yup.object().shape({
  name: yup.string().required("Group name is required!"),
});

interface Props {}

const NewGroupModal: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);

  const show = useSelector((state: RootState) => state.modals.newGroup);
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const res = await createGroup({ ...values } as any);
      if (res) {
        onClose();
      } else {
        console.log("error");
      }
      setLoading(false);
    },
  });

  const onClose = () => showNewGroupModal(false);

  return (
    <Modal isOpen={show} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Create Group</Modal.Header>
        <Modal.Body>
          <ScrollView>
            <VStack space={10} mt={5}>
              <FormControl isInvalid={!!formik.errors.name}>
                <FormControl.Label
                  _text={{ color: "muted.500", fontSize: "sm", bold: true }}
                >
                  Name
                </FormControl.Label>
                <Input
                  value={formik.values.name}
                  onChange={(e) =>
                    formik.setFieldValue("name", e.nativeEvent.text)
                  }
                />
                <FormControl.ErrorMessage>
                  {formik.errors.name}
                </FormControl.ErrorMessage>
              </FormControl>
            </VStack>
          </ScrollView>
        </Modal.Body>
        <Modal.Footer>
          <Button isLoading={loading} onPress={() => formik.handleSubmit()}>
            Create Group
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default NewGroupModal;
