import { ref } from "firebase/database";
import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

let files = collection(db, "files");
let folders = collection(db, "folders");

export const addFiles = (
  fileLink,
  fileName,
  folderId,
  userEmail,
  type,
  size
) => {
  const randNo = Math.floor(Math.random() * 10000000) + 1;

  const newFile = {
    fileLink: fileLink,
    fileName: fileName,
    isFolder: false,
    isStarred: false,
    isTrashed: false,
    folderId: folderId,
    id: randNo,
    userEmail: userEmail,
    type: type,
    size: size,
  };
  console.log(newFile);
  // addDoc(files, newFile);
  return newFile;
};

export const addFolder = (payload) => {
  addDoc(folders, {
    ...payload,
  });
  console.log(payload);
  return payload;
};

export const renameFile = async (id, newName, isFolder) => {
  console.log(
    "start renaming process --------------------------------------------"
  );

  const filesQuery = query(isFolder ? folders : files, where("id", "==", id));

  const querySnapshot = await getDocs(filesQuery);

  if (querySnapshot.empty) {
    console.log("No matching documents.");
    return;
  }

  // Assuming there's only one document with the matching 'id' field
  querySnapshot.forEach(async (doc) => {
    const docRef = doc.ref;
    await updateDoc(docRef, {
      [isFolder ? "folderName" : "fileName"]: newName,
    });
    console.log("Document successfully updated!");
  });
};

export const starFile = async (id, isStarred, isFolder) => {
  const filesQuery = query(isFolder ? folders : files, where("id", "==", id));

  const querySnapshot = await getDocs(filesQuery);

  if (querySnapshot.empty) {
    console.log("No matching documents.");
    return;
  }

  // Assuming there's only one document with the matching 'id' field
  querySnapshot.forEach(async (doc) => {
    const docRef = doc.ref;
    await updateDoc(docRef, {
      isStarred: isStarred,
    });
    console.log("Document successfully updated!");
  });
};

export const trashFile = async (id, isTrashed, isFolder) => {
  const filesQuery = query(isFolder ? folders : files, where("id", "==", id));

  const querySnapshot = await getDocs(filesQuery);

  if (querySnapshot.empty) {
    console.log("No matching documents.");
    return;
  }

  // Assuming there's only one document with the matching 'id' field
  querySnapshot.forEach(async (doc) => {
    const docRef = doc.ref;
    await updateDoc(docRef, {
      isTrashed: isTrashed,
    });
    console.log("Document successfully updated!");
  });
};

export const deleteFile = async (id, isFolder) => {
  const filesQuery = query(isFolder ? folders : files, where("id", "==", id));

  const querySnapshot = await getDocs(filesQuery);

  if (querySnapshot.empty) {
    console.log("No matching documents.");
    return;
  }

  // Assuming there's only one document with the matching 'id' field
  querySnapshot.forEach(async (doc) => {
    const docRef = doc.ref;
    await deleteDoc(docRef);
    console.log("Document successfully deleted!");
  });
};
