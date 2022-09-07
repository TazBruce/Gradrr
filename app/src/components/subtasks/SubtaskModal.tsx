import { Button, Fab, Icon, Modal, VStack } from "native-base";
import React, { useContext, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as Yup from "yup";
import { t } from "../../utils";
import { initialSubtask, Subtask } from "../../types/Subtask";
import { Assignment } from "../../types/Assignment";
import { AuthContext } from "../../providers/AuthProvider";
import { collection, doc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { Formik } from "formik";
import TextField from "../common/form/TextField";
import DateField from "../common/form/DateField";

const schema = Yup.object().shape({
  title: Yup.string().required().label(t("createAssignment.titleLabel")),
  due_date: Yup.date().nullable().label(t("createAssignment.dueDateLabel")),
});

interface ModalProps {
  assignment: Assignment;
  subtask: Subtask | null;
}

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
    if (user == null || props.assignment.id == null) {
      console.log("User not logged in");
    } else {
      mutation.mutate({
        owner: user.uid,
        assignment: props.assignment.id,
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
      {!showModal && (
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
                <Modal.Header>Create Subtask</Modal.Header>
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
                      label={t("createAssignment.dueDateLabel")}
                      placeholder={t("createAssignment.dueDateHint")}
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
