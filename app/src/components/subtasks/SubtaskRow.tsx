import React, { useContext, useState } from "react";
import { Heading, HStack, Icon, IconButton, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../../providers/AuthProvider";
import { collection, doc } from "firebase/firestore";
import { db as firestore } from "../../services/firebase";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { Subtask } from "../../types/Subtask";
import { getDueDate } from "../../types/Assignment";

interface RowProps {
  subtask: Subtask;
}

/**
 * Renders an assignment row.
 * @constructor Creates an SubtaskRow.
 * @param props
 */
export default function SubtaskRow(props: RowProps): JSX.Element {
  const subtask = props.subtask;
  const [completed, setCompleted] = useState(subtask.is_complete);
  const { user } = useContext(AuthContext);
  const ref = collection(firestore, "subtasks");
  const document = subtask.id
    ? // @ts-ignore
      doc(ref, subtask.id.toString())
    : doc(ref);
  const mutation = useFirestoreDocumentMutation(document);
  const { mutate } = mutation;

  const markComplete = () => {
    setCompleted(!completed);
    subtask.is_complete = !completed;
    mutate({
      ...subtask,
      owner: user?.uid,
    });
  };

  return (
    <HStack
      key={subtask.id}
      paddingTop={3}
      paddingBottom={3}
      space={3}
      h="60"
      w="100%"
      justifyContent="flex-start"
    >
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
      <VStack alignSelf="center" w="36%">
        <Heading size="md" numberOfLines={1}>
          {subtask.title}
        </Heading>
        <Heading size="md">{getDueDate(subtask)}</Heading>
      </VStack>
    </HStack>
  );
}
