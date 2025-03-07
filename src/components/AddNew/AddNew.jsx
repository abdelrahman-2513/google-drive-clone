import "./AddNew.css";
import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { addFolder } from "../../assets/Api/firestore";
import { fileUpload } from "../../assets/Api/API";
import { UserAuth } from "../../context/AuthContext";
import { useParams } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// Components ------------------------------------------------------------
import NewMenu from "./NewMenu";
import CreateFolderPopUp from "./CreateFolderPopUp";

export default function AddNewBtn() {
  const queryClient = useQueryClient();
  const [showMenu, setShowMenu] = useState(false);
  const [showNewfolder, setShowNewFolder] = useState(false);
  const { user } = UserAuth();
  const { folderId } = useParams();
  const [progress, setProgress] = useState(0);

  const mutation = useMutation({
    mutationKey: ["upload-file"],
    mutationFn: (file) => fileUpload(file, folderId, user.email, setProgress),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["files", user?.email, folderId || "0"],
        (oldData) => {
          const newData = [data, ...oldData];
          toast.success("File uploaded", { id: 1 });
          return newData;
        }
      );
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // Add new file
  const uploadFile = (file) => {
    toast.loading(`Uploading file ${progress}%`, { id: 1 });
    if (user) {
      if (!file) return;
      mutation.mutate(file);
    }
  };

  // Add new folder
  const uploadFolder = (folderName) => {
    const randNo = Math.floor(Math.random() * 10000000) + 1;
    let payload = {
      folderName: folderName === "" ? "Untitled folder" : folderName,
      isFolder: true,
      isStarred: false,
      isTrashed: false,
      FileList: [],
      id: randNo,
      folderPath: folderId || 0,
      userEmail: user.email,
    };

    addFolder(payload);
    return payload;
  };

  if (mutation.isError) toast.error("Try again later");
  return (
    <>
      <div className="add-btn">
        <button
          type="button"
          title="add new file"
          className="btn"
          onClick={() => setShowMenu((t) => !t)}
        >
          <IoAdd className="icon" />
          <h4>New</h4>
        </button>
        {showMenu && (
          <NewMenu
            setShowMenu={setShowMenu}
            setShowNewFolder={setShowNewFolder}
            uploadFile={uploadFile}
          />
        )}
        {showNewfolder && (
          <CreateFolderPopUp
            setPopup={setShowNewFolder}
            uploadFolder={uploadFolder}
          />
        )}
      </div>
    </>
  );
}
