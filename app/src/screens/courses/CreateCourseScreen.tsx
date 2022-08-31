import React, { useContext } from "react";
import { t } from "../../utils";
import * as Yup from "yup";
import Screen from "../../components/common/Screen";
import TextField from "../../components/common/form/TextField";
import { Formik } from "formik";
import { Button, Checkbox, HStack, Select, VStack } from "native-base";
import { AuthContext } from "../../providers/AuthProvider";
import { collection } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Course, initialCourse } from "../../types/Course";

const schema = Yup.object().shape({
  title: Yup.string().required().label(t("createCourse.titleLabel")),
  description: Yup.string()
    .required()
    .label(t("createCourse.descriptionLabel")),
  year_of_study: Yup.string().required().label(t("createCourse.yearLabel")),
  final_grade: Yup.string().label(t("createCourse.finalGradeLabel")),
});

export default function CreateCourseScreen({
  navigation,
}: NativeStackScreenProps<any>) {
  const { user } = useContext(AuthContext);
  const ref = collection(db, "courses");
  const mutation = useFirestoreCollectionMutation(ref);

  const handleFormSubmit = async ({
    title,
    description,
    year_of_study,
    final_grade,
  }: Course) => {
    if (user == null) {
      console.log("User not logged in");
    } else {
      mutation.mutate({
        owner: user.uid,
        title: title,
        description: description,
        year_of_study: year_of_study,
        final_grade: final_grade,
      });
      if (mutation.isError) {
        console.log(mutation.error.message);
      } else {
        console.log("Success");
        let course: Course = {
          owner: user.uid,
          title: title,
          description: description,
          year_of_study: year_of_study,
          final_grade: final_grade,
        };
        navigation.replace("ViewCourse", {
          course: course,
        });
      }
    }
  };

  const [completed, setCompleted] = React.useState(false);
  const [grade, setGrade] = React.useState("");

  return (
    <Screen title={t("createCourse.title")} showBackButton={true}>
      <Formik
        validationSchema={schema}
        initialValues={initialCourse}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <VStack space={3} mt="5">
            <TextField
              name="title"
              label={t("createCourse.titleLabel")}
              placeholder={t("createCourse.titleHint")}
              isRequired
            />
            <TextField
              name="description"
              label={t("createCourse.descriptionLabel")}
              placeholder={t("createCourse.descriptionHint")}
              isRequired
            />
            <TextField
              name="year_of_study"
              label={t("createCourse.yearLabel")}
              placeholder={t("createCourse.yearHint")}
              isRequired
            />
            <HStack space={4} justifyContent="space-evenly">
              <Checkbox
                value={"courseCompleted"}
                onChange={() => setCompleted(!completed)}
                accessibilityLabel={t("createCourse.completedLabel")}
              >
                {t("createCourse.completedLabel")}
              </Checkbox>
              <Select
                selectedValue={grade}
                placeholder={t("createCourse.gradeHint")}
                onValueChange={(value) => setGrade(value)}
                isDisabled={!completed}
                width="3xs"
                accessibilityLabel={t("createCourse.gradeLabel")}
              >
                <Select.Item label="A+" value="A+" />
                <Select.Item label="A" value="A" />
                <Select.Item label="A-" value="A-" />
                <Select.Item label="B+" value="B+" />
                <Select.Item label="B" value="B" />
                <Select.Item label="B-" value="B-" />
                <Select.Item label="C+" value="C+" />
                <Select.Item label="C" value="C" />
                <Select.Item label="C-" value="C-" />
                <Select.Item label="D+" value="D+" />
                <Select.Item label="D" value="D" />
                <Select.Item label="D-" value="D-" />
                <Select.Item label="F" value="F" />
              </Select>
            </HStack>
            <Button
              color="primary.500"
              mt="2"
              onPress={() => handleSubmit()}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              {t("createCourse.create")}
            </Button>
          </VStack>
        )}
      </Formik>
    </Screen>
  );
}
