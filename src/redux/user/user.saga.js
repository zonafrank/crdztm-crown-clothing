import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  auth,
  createUserProfileDocument, getCurrentUser, googleProvider
} from "../../firebase/firebase.utils";
import { signInFailure, signInSuccess, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess } from "./user.actions";
import userActionTypes from "./user.types";

export function* getSnapshotFromUserAuth(user, additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, user, additionalData);
    const snapshot = yield userRef.get();
    yield put(signInSuccess({ id: snapshot.id, ...snapshot.data() }));
  } catch (error) {
    throw error;
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();

    if (!userAuth) return;

    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOut() {
  try {
    yield auth.signOut()
    yield put(signOutSuccess())
  } catch (error) {
    yield put(signOutFailure(error)) 
  }
}

export function* onSingoutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOut)
}

export function* signUp({payload: {email, password, displayName}}) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(
      email,
      password
    );

    yield put(signUpSuccess({user, additionalData: {displayName}}))
  } catch (error) {
    yield put(signUpFailure(error))
  }
}

export function* onSingUpStart() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUp)
}

export function* signInAfterSignUp({payload: {user, additionalData}}) {
    yield getSnapshotFromUserAuth(user, additionalData) 
}

export function* onSingUpSuccess() {
  yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
} 

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSingoutStart),
    call(onSingUpStart),
    call(onSingUpSuccess)
  ]);
}
