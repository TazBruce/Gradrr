import React from "react";
import SubtaskRow from "./SubtaskRow";
import { ScrollView, VStack } from "native-base";
import { Assignment } from "../../types/Assignment";
import {
  getAllSubtasks,
  getAssignmentSubtasks,
} from "../../providers/DataProvider";
import { Subtask } from "../../types/Subtask";

/**
 * Renders a list of subtasks.
 * @param assignment The assignment to get subtasks for.
 * @param allSubtasks Whether to get all subtasks or just the ones for the assignment.
 * @constructor Creates a SubtaskList.
 */
export default function SubtaskList(
  assignment: Assignment | null = null,
  allSubtasks: boolean = false
): JSX.Element {
  const mapSubtasks = (subtaskList: Subtask[]) => {
    return subtaskList.map(function (subtask: Subtask) {
      return (
        <SubtaskRow
          key={subtask.id}
          subtask={subtask}
          // @ts-ignore
          assignmentId={assignment.id}
        />
      );
    });
  };

  const subtasks = () => {
    let result;
    if (assignment != null && assignment.id) {
      result = getAssignmentSubtasks(assignment.id);
    } else if (assignment == null && allSubtasks) {
      result = getAllSubtasks();
    }
    if (result instanceof Array) {
      return mapSubtasks(result);
    } else {
      return result;
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
