import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage, db } from "../../firebaseConfig";
import { addFiles } from "./firestore";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export const fileUpload = async (
  file,
  parentId = 0,
  userEmail,
  setProgress
) => {
  console.log("from file upload");
  console.log(userEmail);

  // Upload file to Firebase Storage
  const storageRef = ref(storage, `files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  // Wait for the upload to complete
  await new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // You can track the upload progress here if needed
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        reject(error);
      },
      () => {
        resolve();
      }
    );
  });

  // Get the download URL of the uploaded file
  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  console.log(downloadURL);

  // Add the file metadata to Firestore
  const fileData = addFiles(
    downloadURL,
    file.name,
    parentId,
    userEmail,
    file.type,
    file.size
  );

  // Add the file data to Firestore
  const docRef = await addDoc(collection(db, "files"), fileData);
  console.log("Document written with ID: ", docRef.id);

  // Return the file data
  return fileData;
};
export const getFiles = async (userEmail, folderId) => {
  let filesCollection = collection(db, "files");
  let data = [];

  if (userEmail) {
    const filesQuery = query(
      filesCollection,
      where("userEmail", "==", userEmail),
      where("folderId", "==", folderId),
      where("isFolder", "==", false)
    );

    const querySnapshot = await getDocs(filesQuery);
    data = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
    console.log(data);
    return data;
  } else return [];
};

export const getFolders = async (userEmail, folderId) => {
  let filesCollection = collection(db, "files");
  let data = [];

  if (userEmail) {
    const filesQuery = query(
      filesCollection,
      where("userEmail", "==", userEmail),
      where("folderPath", "==", folderId),
      where("isFolder", "==", true)
    );

    const querySnapshot = await getDocs(filesQuery);
    data = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
    console.log(data);
    return data;
  } else return [];
};
export const getStorage = async (userEmail) => {
  let files = collection(db, "files");

  if (userEmail) {
    const filesQuery = query(files, where("userEmail", "==", userEmail));

    const querySnapshot = await getDocs(filesQuery);
    let sum = 0;
    querySnapshot.forEach((doc) => {
      const size = doc.data().size;
      if (size) {
        sum += size;
      }
    });
    const totalSizeMB = (sum / (1024 * 1024)).toFixed(2); // Convert bytes to MB and format to 2 decimal places
    console.log(totalSizeMB);
    return totalSizeMB;
  } else return 0;
};
