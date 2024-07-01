import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

function CreateFolderPopUp({ setPopup, uploadFolder }) {
  const menuRef = useRef();
  const { user } = UserAuth();
  const queryClient = useQueryClient();
  const [folderName, setFolderName] = useState("");
  const mutation = useMutation({
    mutationKey: ["create-folder"],
    mutationFn: uploadFolder,
    onSuccess: (data) => {
      queryClient.setQueryData(["folders", user?.email], (oldData) => {
        let newData = [data];
        if (oldData) {
          newData = [data, ...oldData];
        }
        console.log(newData, data);
        return newData;
      });
    },
    onError: (err) => {
      console.log(err);

      toast.error(err.message);
    },
  });
  const handleCreateFolder = () => {
    console.log(folderName);
    mutation.mutate(folderName);
    toast.success("Folder Created Successfully!");
    setPopup(false);
  };
  if (mutation.isError) {
    toast.error("Please Try again later!");
  }
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
  return (
    <div className="overlay">
      <div className="popup" ref={menuRef}>
        <h3>New Folder</h3>
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
          <h5 onClick={handleCreateFolder}>Create</h5>
        </div>
      </div>
    </div>
  );
}

export default CreateFolderPopUp;
