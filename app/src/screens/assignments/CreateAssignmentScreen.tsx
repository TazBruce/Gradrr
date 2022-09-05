import React, { Key, useContext } from "react";
import { t } from "../../utils";
import * as Yup from "yup";
import Screen from "../../components/common/Screen";
import TextField from "../../components/common/form/TextField";
import { Formik } from "formik";
import { Button, Checkbox, VStack } from "native-base";
import { AuthContext } from "../../providers/AuthProvider";
import { collection, doc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CourseStackParamList } from "../../types/Course";
import { Assignment, initialAssignment } from "../../types/Assignment";
import DateField from "../../components/common/form/DateField";

const schema = Yup.object().shape({
  title: Yup.string().required().label(t("createAssignment.titleLabel")),
  description: Yup.string().label(t("createAssignment.descriptionLabel")),
  due_date: Yup.date().nullable().label(t("createAssignment.dueDateLabel")),
  weight: Yup.number().label(t("createAssignment.weightLabel")),
  is_complete: Yup.boolean()
    .required()
    .label(t("createAssignment.completedLabel")),
  is_letter_grade: Yup.boolean().label(
    t("createAssignment.isLetterGradeLabel")
  ),
  grade: Yup.string().label(t("createAssignment.gradeLabel")),
  earned_marks: Yup.number()
    .nullable()
    .label(t("createAssignment.earnedMarksLabel")),
  max_marks: Yup.number().nullable().label(t("createAssignment.maxMarksLabel")),
});

/**
 * Create or edit a course.
 * @param navigation The navigation object.
 * @param route The route object.
 * @constructor Create or edit a course.
 */
export default function CreateAssignmentScreen({
  navigation,
  route,
}: NativeStackScreenProps<CourseStackParamList, "CreateAssignment">) {
  const { user } = useContext(AuthContext);
  const ref = collection(db, "assignments");
  const editStatus = isEditing(route.params);
  const withinCourse = isWithinCourse(route.params);
  const buttonText = editStatus
    ? t("createAssignment.save")
    : t("createAssignment.create");
  const titleText = editStatus
    ? t("createAssignment.editTitle")
    : t("createAssignment.createTitle");
  // @ts-ignore
  const document = editStatus
    ? // @ts-ignore
      doc(ref, route.params.assignment.id.toString())
    : doc(ref);
  let initialValues = editStatus
    ? // @ts-ignore
      route.params.assignment
    : initialAssignment;
  initialValues.course = withinCourse
    ? // @ts-ignore
      route.params.courseID
    : initialValues.course;

  const mutation = useFirestoreDocumentMutation(document);

  const handleFormSubmit = async ({
    title,
    description,
    due_date,
    weight,
    is_complete,
    is_letter_grade,
    grade,
    earned_marks,
    max_marks,
  }: Assignment) => {
    if (user == null) {
      console.log("User not logged in");
    } else {
      mutation.mutate({
        owner: user.uid,
        course: initialValues.course,
        title: title,
        description: description,
        due_date: due_date,
        weight: weight,
        is_complete: is_complete,
        is_letter_grade: is_letter_grade,
        grade: grade,
        earned_marks: earned_marks,
        max_marks: max_marks,
      });
      if (mutation.isError) {
        console.log(mutation.error.message);
      } else {
        console.log("Success");
        let assignment: Assignment = {
          id: document.id,
          owner: user.uid,
          course: initialValues.course,
          title: title,
          description: description,
          due_date: due_date,
          weight: weight,
          is_complete: is_complete,
          is_letter_grade: is_letter_grade,
          grade: grade,
          earned_marks: earned_marks,
          max_marks: max_marks,
        };
        if (editStatus) {
          navigation.pop();
        }
        navigation.replace("ViewAssignment", {
          assignment: assignment,
        });
      }
    }
  };

  const [completed, setCompleted] = React.useState(false);
  const [isLetter, setIsLetter] = React.useState(false);

  return (
    <Screen
      title={titleText}
      currentItem={initialValues}
      showBackButton={true}
      showDeleteButton={editStatus}
    >
      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <VStack space={3} mt="5">
            <TextField
              name="title"
              label={t("createAssignment.titleLabel")}
              placeholder={t("createAssignment.titleHint")}
              isRequired
            />
            <TextField
              name="description"
              label={t("createAssignment.descriptionLabel")}
              placeholder={t("createAssignment.descriptionHint")}
            />
            <DateField
              name="due_date"
              label={t("createAssignment.dueDateLabel")}
              placeholder={t("createAssignment.dueDateHint")}
            />
            <TextField
              name="weight"
              label={t("createAssignment.weightLabel")}
              placeholder={t("createAssignment.weightHint")}
            />
            <Checkbox
              value={"is_complete"}
              onChange={() => setCompleted(!completed)}
              accessibilityLabel={t("createAssignment.completedLabel")}
            >
              {t("createAssignment.completedLabel")}
            </Checkbox>
            <Checkbox
              value={"is_letter_grade"}
              onChange={() => setIsLetter(!isLetter)}
              accessibilityLabel={t("createAssignment.isLetterGradeLabel")}
            >
              {t("createAssignment.isLetterGradeLabel")}
            </Checkbox>
            <Button
              color="primary.500"
              mt="2"
              onPress={() => handleSubmit()}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              {buttonText}
            </Button>
          </VStack>
        )}
      </Formik>
    </Screen>
  );
}

/**
 * Check if the route is for editing an existing assignment.
 * @param params The route params.
 */
function isEditing(
  params: Readonly<{ assignment: Assignment } | undefined> | null
): boolean {
  return (
    params != null && params.assignment.id != null && params.assignment.id != ""
  );
}

/**
 * Check if the assignment is within a course.
 * @param params The route params.
 */
function isWithinCourse(
  params:
    | Readonly<
        { courseID: React.Key | undefined; assignment: Assignment } | undefined
      >
    | undefined
): boolean {
  return params != null && params.courseID != null && params.courseID != "";
}
