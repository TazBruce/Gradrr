import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const firestore = admin.firestore();

export const authOnCreate =
  functions.auth.user().onCreate(async (user) => {
    console.log(`Creating document for user ${user.uid}`);
    await firestore.collection("users").doc(user.uid).set({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

export const authOnDelete =
  functions.auth.user().onDelete(async (user) => {
    console.log(`Deleting document for user ${user.uid}`);
    await firestore.collection("users").doc(user.uid).delete();
  });

/**
 * Update a courses total percentage when an assignment is updated
 * Also marks all subtasks as complete if the assignment is complete
 */
export const assignmentOnUpdate =
  functions.firestore.document("assignments/{assignmentId}")
      .onUpdate(async (change, context) => {
        const assignment = change.after.data();
        const oldAssignment = change.before.data();

        let newGradedWeight = 0;
        if (assignment.is_complete !== oldAssignment.is_complete) {
          if (assignment.is_complete) {
            newGradedWeight = assignment.weight;

            // Mark all subtasks as complete
            const subtasks = await firestore.collection("subtasks")
                .where("assignment", "==", context.params.assignmentId)
                .get();
            subtasks.forEach(async (subtask) => {
              await subtask.ref.update({is_complete: true});
            });
          } else {
            newGradedWeight = -oldAssignment.weight;
          }
        } else if (assignment.weight !== oldAssignment.weight) {
          if (assignment.is_complete) {
            newGradedWeight = assignment.weight - oldAssignment.weight;
          }
        }
        await firestore.collection("courses").doc(assignment.course).update({
          current_percentage: admin.firestore.FieldValue.increment(
              assignment.percentage - oldAssignment.percentage),
          total_weight: admin.firestore.FieldValue.increment(
              assignment.weight - oldAssignment.weight),
          graded_weight: admin.firestore.FieldValue.increment(newGradedWeight),
        });
      });

/**
 * Update a courses total percentage when an assignment is created
 */
export const assignmentOnCreate =
  functions.firestore.document("assignments/{assignmentId}")
      .onCreate(async (snapshot, context) => {
        const assignmentId = context.params.assignmentId;
        const assignment = snapshot.data();

        console.log(`Creating assignment ${assignmentId}`);
        await firestore.collection("courses").doc(assignment.course).update({
          current_percentage: admin.firestore.FieldValue.increment(
              assignment.percentage),
          total_weight: admin.firestore.FieldValue.increment(
              assignment.weight),
          graded_weight: assignment.is_complete ?
            admin.firestore.FieldValue.increment(assignment.weight) :
            admin.firestore.FieldValue.increment(0),
        });
      }
      );

/**
 * Update a courses total percentage when an assignment is deleted
 * Also delete all subtasks associated with the assignment
 */
export const assignmentOnDelete =
  functions.firestore.document("assignments/{assignmentId}")
      .onDelete(async (snapshot, context) => {
        const assignmentId = context.params.assignmentId;
        const assignment = snapshot.data();

        // Update course
        console.log(`Deleting assignment ${assignmentId}`);
        await firestore.collection("courses").doc(assignment.course).update({
          current_percentage: admin.firestore.FieldValue.increment(
              -assignment.percentage),
          // eslint-disable-next-line max-len
          total_weight: admin.firestore.FieldValue.increment(-assignment.weight),
          graded_weight: assignment.is_complete ?
            admin.firestore.FieldValue.increment(-assignment.weight) :
            admin.firestore.FieldValue.increment(0),
        });

        // Delete all subtasks associated with the assignment
        const subtasks = await firestore.collection("subtasks")
            .where("assignment", "==", assignmentId).get();
        subtasks.forEach(async (subtask) => {
          await subtask.ref.delete();
        });
      }
      );

/**
 * Delete all assignments when a course is deleted
 */
export const courseOnDelete =
  functions.firestore.document("courses/{courseId}")
      .onDelete(async (snapshot, context) => {
        const courseId = context.params.courseId;

        console.log(`Deleting course ${courseId}`);
        const assignments = await firestore
            .collection("assignments")
            .where("course", "==", courseId)
            .get();

        assignments.forEach(async (assignment) => {
          await assignment.ref.delete();
        });
      }
      );

/**
 * Mark all assignments as complete when a course is marked as complete
 */
export const courseOnUpdate =
  functions.firestore.document("courses/{courseId}")
      .onUpdate(async (change, context) => {
        const course = change.after.data();
        const oldCourse = change.before.data();

        if (course.is_complete !== oldCourse.is_complete) {
          if (course.is_complete) {
            const assignments = await firestore
                .collection("assignments")
                .where("course", "==", context.params.courseId)
                .get();

            assignments.forEach(async (assignment) => {
              await assignment.ref.update({is_complete: true});
            });
          }
        }
      }
      );
