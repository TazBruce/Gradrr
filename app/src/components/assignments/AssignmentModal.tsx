import { Button, Checkbox, Modal, VStack } from "native-base";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { t } from "../../utils";
import { AuthContext } from "../../providers/AuthProvider";
import { collection, doc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { Formik } from "formik";
import {
  Assignment,
  getGrade,
  getPercentage,
  initialAssignment,
} from "../../types/Assignment";
import TextField from "../common/form/TextField";
import SelectField from "../common/form/SelectField";

const schema = Yup.object().shape({
  grade: Yup.string().label(t("createAssignment.gradeLabel")),
  earned_marks: Yup.number()
    .nullable()
    .label(t("createAssignment.earnedMarksLabel")),
  max_marks: Yup.number().nullable().label(t("createAssignment.maxMarksLabel")),
});

interface ModalProps {
  assignment: Assignment;
}

export default function AssignmentModal(props: ModalProps) {
  const [showModal, setShowModal] = useState(false);
  const [gradesReleased, setGradesReleased] = useState(true);
  const [isLetterGrade, setIsLetterGrade] = useState(false);
  const { user } = useContext(AuthContext);
  const ref = collection(db, "assignments");
  // @ts-ignore
  const document = doc(ref, props.assignment.id.toString());
  const mutation = useFirestoreDocumentMutation(document);

  const handleFormSubmit = async ({
    grade,
    earned_marks,
    max_marks,
  }: Assignment) => {
    if (user == null || props.assignment.id == null) {
      console.log("User not logged in");
    } else {
      if (!gradesReleased) {
        grade = "";
        earned_marks = null;
        max_marks = null;
      } else if (isLetterGrade) {
        earned_marks = null;
        max_marks = null;
      } else {
        grade = "";
      }
      const newGrade = getGrade(grade, earned_marks, max_marks);
      const newPercentage = getPercentage(
        props.assignment.weight,
        grade,
        earned_marks,
        max_marks
      );
      mutation.mutate({
        ...props.assignment,
        is_complete: true,
        earned_marks: earned_marks,
        max_marks: max_marks,
        grade: newGrade,
        percentage: newPercentage,
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
        <Button onPress={() => setShowModal(true)}>
          {t("createAssignment.markAsComplete")}
        </Button>
      )}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        avoidKeyboard={true}
      >
        <Modal.Content maxWidth="400px">
          <Formik
            validationSchema={schema}
            initialValues={initialAssignment}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit, isSubmitting }) => (
              <>
                <Modal.CloseButton />
                <Modal.Header>
                  {t("createAssignment.completeTitle")}
                </Modal.Header>
                <Modal.Body>
                  <VStack space={3} mt="5">
                    <Checkbox
                      defaultIsChecked={gradesReleased}
                      value={gradesReleased.toString()}
                      onChange={() => setGradesReleased(!gradesReleased)}
                    >
                      {t("createAssignment.gradesReleasedLabel")}
                    </Checkbox>
                    {gradesReleased && (
                      <Checkbox
                        defaultIsChecked={isLetterGrade}
                        value={isLetterGrade.toString()}
                        onChange={() => setIsLetterGrade(!isLetterGrade)}
                      >
                        {t("createAssignment.isLetterGradeLabel")}
                      </Checkbox>
                    )}
                    {gradesReleased && isLetterGrade && (
                      <SelectField
                        name={"grade"}
                        label={t("createAssignment.gradeLabel")}
                        values={[
                          "A+",
                          "A",
                          "A-",
                          "B+",
                          "B",
                          "B-",
                          "C+",
                          "C",
                          "C-",
                          "D",
                          "E",
                        ]}
                        isDisabled={!gradesReleased || !isLetterGrade}
                      />
                    )}
                    {gradesReleased && !isLetterGrade && (
                      <>
                        <TextField
                          name="earned_marks"
                          label={t("createAssignment.earnedMarksLabel")}
                          placeholder={t("createAssignment.earnedMarksHint")}
                          isDisabled={!gradesReleased || isLetterGrade}
                        />
                        <TextField
                          name="max_marks"
                          label={t("createAssignment.maxMarksLabel")}
                          placeholder={t("createAssignment.maxMarksHint")}
                          isDisabled={!gradesReleased || isLetterGrade}
                        />
                      </>
                    )}
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
                      {t("createAssignment.cancel")}
                    </Button>
                    <Button
                      color="primary.500"
                      mt="2"
                      onPress={() => handleSubmit()}
                      isLoading={isSubmitting}
                      isDisabled={isSubmitting}
                    >
                      {t("createAssignment.complete")}
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
