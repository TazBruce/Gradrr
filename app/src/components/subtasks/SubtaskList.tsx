import React from "react";
import SubtaskRow from "./SubtaskRow";
import { ScrollView, VStack } from "native-base";
import { Assignment } from "../../types/Assignment";
import { getAssignmentSubtasks } from "../../providers/DataProvider";
import { Subtask } from "../../types/Subtask";

export default function SubtaskList(assignment: Assignment): JSX.Element {
  const subtasks = function () {
    if (assignment.id) {
      let result = getAssignmentSubtasks(assignment.id);
      if (result instanceof Array) {
        return result.map(function (subtask: Subtask) {
          // @ts-ignore
          return (
            <SubtaskRow
              key={subtask.id}
              subtask={subtask}
              assignmentId={assignment.id}
            />
          );
        });
      } else {
        return result;
      }
    }
  };

  return (
    <>
      {
        <ScrollView h="61%">
          <VStack space={4}>{subtasks()}</VStack>
        </ScrollView>
      }
    </>
  );
}
