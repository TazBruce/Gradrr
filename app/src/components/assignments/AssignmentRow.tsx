import React, { useContext, useState } from "react";
import {
  Divider,
  Heading,
  HStack,
  Icon,
  IconButton,
  Pressable,
  VStack,
  Text,
} from "native-base";
import { CourseStackParamList } from "../../types/Course";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Assignment,
  getDueDate,
  removeTrailingDecimals,
} from "../../types/Assignment";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../../providers/AuthProvider";
import { collection, doc } from "firebase/firestore";
import { db as firestore } from "../../services/firebase";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { t } from "../../utils";

interface RowProps {
  navigation: NativeStackNavigationProp<CourseStackParamList>;
  assignment: Assignment;
}

/**
 * Renders an assignment row.
 * @constructor Creates an AssignmentRow.
 * @param props
 */
export default function AssignmentRow(props: RowProps): JSX.Element {
  const assignment = props.assignment;
  const navigation = props.navigation;
  const [completed, setCompleted] = useState(assignment.is_complete);
  const { user } = useContext(AuthContext);
  const ref = collection(firestore, "assignments");
  const document = assignment.id
    ? // @ts-ignore
      doc(ref, assignment.id.toString())
    : doc(ref);
  const mutation = useFirestoreDocumentMutation(document);
  const { mutate } = mutation;

  const markComplete = () => {
    setCompleted(!completed);
    assignment.is_complete = !completed;
    mutate({
      ...assignment,
      owner: user?.uid,
    });
  };

  return (
    <Pressable
      key={assignment.id}
      onPress={() => navigation.navigate("ViewAssignment", { assignment })}
      paddingTop={3}
      paddingBottom={3}
      _pressed={{ bg: "coolGray.200" }}
    >
      <HStack space={3} h="60" w="100%" justifyContent="flex-start">
        <IconButton
          onPress={markComplete}
          bg={completed ? "primary.500" : "white"}
          rounded="md"
          borderColor={completed ? "primary.500" : "coolGray.500"}
          borderWidth={4}
          shadow={3}
          h="100%"
          w="15%"
          alignSelf="center"
          icon={<Icon as={MaterialIcons} name="check" color="white" />}
        />
        <VStack alignSelf="center" w="36%" space={1}>
          <Heading size="sm" numberOfLines={1}>
            {assignment.title}
          </Heading>
          <HStack space={2}>
            <Icon
              as={MaterialIcons}
              name="date-range"
              size="md"
              color={"primary.500"}
            />
            <Text>{getDueDate(assignment)}</Text>
          </HStack>
        </VStack>
        <Divider
          bg="coolGray.500"
          orientation="vertical"
          mx={4}
          thickness="2"
        />
        <VStack alignSelf="center" w="20%">
          <Heading alignSelf="center" size="md">
            {assignment.is_complete
              ? t("createAssignment.earned")
              : t("createAssignment.weightLabel")}
          </Heading>
          <Heading alignSelf="center" size="md">
            {assignment.is_complete
              ? // @ts-ignore
                removeTrailingDecimals(assignment.percentage)
              : removeTrailingDecimals(assignment.weight)}
            %
          </Heading>
        </VStack>
        <Icon
          size="xl"
          color="black"
          as={<MaterialIcons name="keyboard-arrow-right" />}
          w="5%"
          alignSelf="center"
          alignContent="flex-end"
        />
      </HStack>
    </Pressable>
  );
}
