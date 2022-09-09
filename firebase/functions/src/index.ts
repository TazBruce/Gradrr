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
 */
export const assignmentOnUpdate =
  functions.firestore.document("assignments/{assignmentId}")
      .onUpdate(async (change, context) => {
        const assignmentId = context.params.assignmentId;
        const assignment = change.after.data();
        const oldAssignment = change.before.data();

        if (assignment.percentage !== oldAssignment.percentage) {
          console.log(`Assignment ${assignmentId} 
          percentage changed to ${assignment.percentage}`);
          await firestore.collection("courses").doc(assignment.course).update({
            current_percentage: admin.firestore.FieldValue.increment(
                assignment.percentage - oldAssignment.percentage),
          });
        }
      });

/**
 * Update a courses total percentage when an assignment is deleted
 */
export const assignmentOnDelete =
  functions.firestore.document("assignments/{assignmentId}")
      .onDelete(async (snapshot, context) => {
        const assignmentId = context.params.assignmentId;
        const assignment = snapshot.data();

        console.log(`Deleting assignment ${assignmentId}`);
        await firestore.collection("courses").doc(assignment.course).update({
          current_percentage: admin.firestore.FieldValue.increment(
              -assignment.percentage),
        });
      }
      );

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
