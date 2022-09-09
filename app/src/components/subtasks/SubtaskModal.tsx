import { Button, Fab, Icon, IconButton, Modal, VStack } from "native-base";
import React, { Key, useContext, useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import { t } from "../../utils";
import { initialSubtask, Subtask } from "../../types/Subtask";
import { AuthContext } from "../../providers/AuthProvider";
import { collection, doc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { Formik } from "formik";
import TextField from "../common/form/TextField";
import DateField from "../common/form/DateField";

const schema = Yup.object().shape({
  title: Yup.string().required().label(t("createSubtask.titleLabel")),
  due_date: Yup.date().nullable().label(t("createSubtask.dueDateLabel")),
});

interface ModalProps {
  assignmentID: Key;
  subtask: Subtask | null;
}

/**
 * Renders a modal for creating or editing a subtask.
 * @param props The props for the modal.
 * @constructor Creates a SubtaskModal.
 */
export default function SubtaskModal(props: ModalProps) {
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);
  const ref = collection(db, "subtasks");
  const editStatus = props.subtask !== null;
  const buttonText = editStatus
    ? t("createSubtask.save")
    : t("createSubtask.create");
  const titleText = editStatus
    ? t("createSubtask.editTitle")
    : t("createSubtask.createTitle");
  const document = editStatus
    ? // @ts-ignore
      doc(ref, props.subtask.id.toString())
    : doc(ref);
  let initialValues = props.subtask !== null ? props.subtask : initialSubtask;

  const mutation = useFirestoreDocumentMutation(document);

  const handleFormSubmit = async ({
    title,
    due_date,
    is_complete,
  }: Subtask) => {
    if (user == null || props.assignmentID == null) {
      console.log("User not logged in");
    } else {
      mutation.mutate({
        owner: user.uid,
        assignment: props.assignmentID,
        title: title,
        due_date: due_date,
        is_complete: is_complete,
      });
      if (mutation.isError) {
        console.log(mutation.error.message);
      } else {
        console.log("Success");
        setShowModal(false);
      }
    }
  };

  return (
    <>
      {!showModal && !editStatus && (
        <Fab
          renderInPortal={false}
          bottom={30}
          shadow={2}
          size="sm"
          backgroundColor="primary.500"
          _pressed={{ backgroundColor: "primary.600" }}
          icon={<Icon color="white" as={<AntDesign name="plus" />} />}
          onPress={() => setShowModal(!showModal)}
        />
      )}
      {!showModal && editStatus && (
        <IconButton
          onPress={() => setShowModal(!showModal)}
          bg="white"
          shadow={3}
          h="100%"
          w="15%"
          alignContent="flex-end"
          icon={<Icon as={MaterialIcons} name="edit" color="primary.500" />}
        />
      )}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        avoidKeyboard={true}
      >
        <Modal.Content maxWidth="400px">
          <Formik
            validationSchema={schema}
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit, isSubmitting }) => (
              <>
                <Modal.CloseButton />
                <Modal.Header>{titleText}</Modal.Header>
                <Modal.Body>
                  <VStack space={3} mt="5">
                    <TextField
                      name="title"
                      label={t("createSubtask.titleLabel")}
                      placeholder={t("createSubtask.titleHint")}
                      isRequired
                    />
                    <DateField
                      name="due_date"
                      label={t("createSubtask.dueDateLabel")}
                      placeholder={t("createSubtask.dueDateHint")}
                    />
                  </VStack>
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button
                      variant="ghost"
                      colorScheme="blueGray"
                      onPress={() => {
                        setShowModal(false);
                      }}
                    >
                      {t("createSubtask.cancel")}
                    </Button>
                    <Button
                      color="primary.500"
                      mt="2"
                      onPress={() => handleSubmit()}
                      isLoading={isSubmitting}
                      isDisabled={isSubmitting}
                    >
                      {buttonText}
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </>
            )}
          </Formik>
        </Modal.Content>
      </Modal>
    </>
  );
}
