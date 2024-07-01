import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { renameFile } from "../../assets/Api/firestore";

function RenamePopup({ setPopup, file }) {
  const menuRef = useRef();
  const [folderName, setFolderName] = useState("");
  const { user } = UserAuth();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["rename"],
    mutationFn: (data) => renameFile(data.id, data.newName, data.isFolder),
    onSuccess: () => {
      if (file.isFolder) {
        queryClient.setQueryData(["folders", user?.email], (oldData) => {
          let newData = oldData.map((f) =>
            f.id === file.id
              ? {
                  ...f,
                  folderName: folderName,
                }
              : f
          );
          return newData;
        });
      } else {
        queryClient.setQueryData(["files", user?.email], (oldData) => {
          let newData = oldData.map((f) =>
            f.id === file.id
              ? { ...f, fileName: `${folderName}.${f.fileName.split(".")[1]}` }
              : f
          );
          return newData;
        });
      }
    },
    onError: (err) => {
      console.log(err);

      toast.error(err.message);
    },
  });
  // const handleCreateFolder = () => {
  //   console.log(fifolderName);
  //   mutation.mutate(folderName);
  //   toast.success("Folder Created Successfully!");
  //   setPopup(false);
  // };
  // if (mutation.isError) {
  //   toast.error("Please Try again later!");
  // }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setPopup]);
  const handleRenameFolder = () => {
    console.log(`file with id ${file.id} renamed to ${folderName}`);
    mutation.mutate({
      id: file.id,
      newName: folderName,
      isFolder: file.isFolder,
    });
    setPopup(false);
  };
  return (
    <div className="overlay">
      <div className="popup" ref={menuRef}>
        <h3>Rename</h3>
        <input
          type="text"
          name="name"
          placeholder="Untitled folder"
          onChange={(e) => setFolderName(e.target.value)}
          autoFocus
          required
        />
        <div className="popup-footer">
          <h5 onClick={() => setPopup((t) => !t)}>Cancel</h5>
          <h5 onClick={handleRenameFolder}>Rename</h5>
        </div>
      </div>
    </div>
  );
}

export default RenamePopup;
