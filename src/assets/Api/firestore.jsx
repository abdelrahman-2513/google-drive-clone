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

export const addFiles = (
  fileLink,
  fileName,
  folderId,
  userEmail,
  type,
  size
) => {
  const newFile = {
    fileLink: fileLink,
    fileName: fileName,
    isFolder: false,
    isStarred: false,
    isTrashed: false,
    folderId: folderId,
    userEmail: userEmail,
    type: type,
    size: size,
  };
  console.log(newFile);
  // addDoc(files, newFile);
  return newFile;
};

export const addFolder = (payload) => {
  addDoc(files, {
    ...payload,
  });
  console.log(payload);
  return payload;
};

export const renameFile = async (fileId, newName, isFolder) => {
  const fileRef = doc(files, fileId);

  await updateDoc(fileRef, {
    [isFolder ? "folderName" : "fileName"]: newName,
  });
};

export const starFile = async (fileId, isStarred) => {
  const fileRef = doc(files, fileId);
  try {
    await updateDoc(fileRef, {
      isStarred: isStarred,
    });
  } catch (error) {
    console.error("Error updating file properties: ", error);
  }
};

export const trashFile = async (fileId, isTrashed) => {
  const fileRef = doc(files, fileId);
  try {
    await updateDoc(fileRef, {
      isStarred: false,
      isTrashed: isTrashed,
    });
  } catch (error) {
    console.error("Error updating file properties: ", error);
  }
};

export const deleteFile = async (fileId, isFolder) => {
  const fileRef = doc(files, fileId);
  try {
    // Delete the file or folder itself
    await deleteDoc(fileRef);

    // If it's a folder, also delete all files with the same folderId
    if (isFolder && fileId) {
      const filesQuery = query(files, where("folderId", "==", fileId));
      const querySnapshot = await getDocs(filesQuery);

      const deletePromises = [];

      querySnapshot.forEach((doc) => {
        deletePromises.push(deleteDoc(doc.ref));
      });

      await Promise.all(deletePromises);
    }
  } catch (error) {
    console.error("Error deleting file or folder: ", error);
  }
};
