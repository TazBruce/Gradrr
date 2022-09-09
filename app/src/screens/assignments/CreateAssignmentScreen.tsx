import React, { useContext } from "react";
import { t } from "../../utils";
import * as Yup from "yup";
import Screen from "../../components/common/Screen";
import TextField from "../../components/common/form/TextField";
import { Formik } from "formik";
import { Button, Checkbox, HStack, VStack } from "native-base";
import { AuthContext } from "../../providers/AuthProvider";
import { collection, doc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CourseStackParamList } from "../../types/Course";
import {
  Assignment,
  getGrade,
  getPercentage,
  initialAssignment,
} from "../../types/Assignment";
import DateField from "../../components/common/form/DateField";
import SelectField from "../../components/common/form/SelectField";

const schema = Yup.object().shape({
  title: Yup.string().required().label(t("createAssignment.titleLabel")),
  description: Yup.string().label(t("createAssignment.descriptionLabel")),
  due_date: Yup.date().nullable().label(t("createAssignment.dueDateLabel")),
  weight: Yup.number()
    .min(0, "must be at least 0%")
    .max(100, "cannot be over 100%")
    .label(t("createAssignment.weightLabel")),
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
    grade,
    earned_marks,
    max_marks,
  }: Assignment) => {
    if (user == null) {
      console.log("User not logged in");
    } else {
      if (!completed || !gradesReleased) {
        grade = "";
        earned_marks = null;
        max_marks = null;
        is_complete = !!completed;
      } else if (isLetter) {
        earned_marks = null;
        max_marks = null;
        is_complete = true;
      } else {
        grade = "";
        is_complete = true;
      }
      const newGrade = getGrade(grade, earned_marks, max_marks);
      const newPercentage = getPercentage(
        weight,
        grade,
        earned_marks,
        max_marks
      );
      mutation.mutate({
        owner: user.uid,
        course: initialValues.course,
        title: title,
        description: description,
        due_date: due_date,
        weight: Number.parseInt(weight.toString()),
        is_complete: is_complete,
        earned_marks: earned_marks,
        max_marks: max_marks,
        grade: newGrade,
        percentage: newPercentage,
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
          weight: Number.parseInt(weight.toString()),
          is_complete: is_complete,
          earned_marks: earned_marks,
          max_marks: max_marks,
          grade: newGrade,
          percentage: newPercentage,
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

  const [completed, setCompleted] = React.useState(
    editStatus ? initialValues.is_complete : false
  );
  const [gradesReleased, setGradesReleased] = React.useState(
    editStatus
      ? initialValues.grade !== "" ||
          (initialValues.earned_marks != null &&
            initialValues.max_marks != null)
      : true
  );
  const [isLetter, setIsLetter] = React.useState(
    editStatus ? initialValues.grade != "" : false
  );

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
          <VStack space={3}>
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
              value={completed.toString()}
              isChecked={completed}
              onChange={() => setCompleted(!completed)}
              accessibilityLabel={t("createAssignment.completedLabel")}
            >
              {t("createAssignment.completedLabel")}
            </Checkbox>
            {completed && (
              <HStack space={3}>
                <Checkbox
                  value={gradesReleased.toString()}
                  isChecked={gradesReleased}
                  onChange={() => setGradesReleased(!gradesReleased)}
                  accessibilityLabel={t("createAssignment.gradesReleasedLabel")}
                >
                  {t("createAssignment.gradesReleasedLabel")}
                </Checkbox>
                {completed && gradesReleased && (
                  <Checkbox
                    value={isLetter.toString()}
                    isChecked={isLetter}
                    onChange={() => setIsLetter(!isLetter)}
                    accessibilityLabel={t(
                      "createAssignment.isLetterGradeLabel"
                    )}
                  >
                    {t("createAssignment.isLetterGradeLabel")}
                  </Checkbox>
                )}
              </HStack>
            )}
            {completed && gradesReleased && isLetter && (
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
                isDisabled={!gradesReleased || !isLetter}
              />
            )}
            {completed && gradesReleased && !isLetter && (
              <VStack space={3}>
                <TextField
                  name={"earned_marks"}
                  label={t("createAssignment.earnedMarksLabel")}
                  placeholder={t("createAssignment.earnedMarksHint")}
                  isDisabled={!gradesReleased || isLetter}
                />
                <TextField
                  name={"max_marks"}
                  label={t("createAssignment.maxMarksLabel")}
                  placeholder={t("createAssignment.maxMarksHint")}
                  isDisabled={!gradesReleased || isLetter}
                />
              </VStack>
            )}
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
