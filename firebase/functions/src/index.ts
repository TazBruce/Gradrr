import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const firestore = admin.firestore();

export const authOnCreate =
  functions.auth.user().onCreate(async (user) => {
    console.log(`Creating document for user ${user.uid}`);
    await firestore.collection('users').doc(user.uid).set({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      credits: 5
    });
  });

export const authOnDelete =
  functions.auth.user().onDelete(async (user) => {
    console.log(`Deleting document for user ${user.uid}`);
    await firestore.collection('users').doc(user.uid).delete();
  });
