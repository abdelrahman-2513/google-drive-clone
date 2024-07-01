import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdDeleteForever, MdRestore } from "react-icons/md";
import { UserAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { deleteFile, trashFile } from "../../assets/Api/firestore";

function TrashPopup({ file }) {
  const { user } = UserAuth();
  const queryClient = useQueryClient();
  const trashMutation = useMutation({
    mutationKey: ["trashed"],
    mutationFn: (data) => trashFile(data.id, !data.isTrashed, data.isFolder),
    onSuccess: () => {
      if (file.isFolder) {
        queryClient.setQueryData(["folders", user?.email], (oldData) => {
          const newFile = { ...file, isTrashed: false };

          let newData = [...oldData, newFile];
          return newData;
        });
        queryClient.setQueryData(
          ["trashed-folders", user?.email],
          (oldData) => {
            let newData = oldData.filter((f) => f.id !== file.id);
            return newData;
          }
        );
      } else {
        queryClient.setQueryData(["files", user?.email], (oldData) => {
          const newFile = { ...file, isTrashed: false };

          let newData = [...oldData, newFile];
          return newData;
        });
        queryClient.setQueryData(["trashed-files", user?.email], (oldData) => {
          let newData = oldData.filter((f) => f.id !== file.id);
          return newData;
        });
      }
    },
    onError: (err) => {
      console.log(err);

      toast.error(err.message);
    },
  });
  const deleteMutation = useMutation({
    mutationKey: ["delete"],
    mutationFn: (data) => deleteFile(data.id, data.isFolder),
    onSuccess: () => {
      if (file.isFolder) {
        queryClient.setQueryData(
          ["trashed-folders", user?.email],
          (oldData) => {
            let newData = oldData.filter((f) => f.id !== file.id);
            return newData;
          }
        );
      } else {
        queryClient.setQueryData(["trashed-files", user?.email], (oldData) => {
          let newData = oldData.filter((f) => f.id !== file.id);
          return newData;
        });
      }
    },
    onError: (err) => {
      console.log(err);

      toast.error(err.message);
    },
  });

  const handleUnTrash = () => {
    console.log(`The file of id: ${file.id} needed to be untrashed`);
    trashMutation.mutate({
      id: file.id,
      isTrashed: file.isTrashed,
      isFolder: file.isFolder,
    });
  };
  const handleDelete = () => {
    console.log(`The file of id: ${file.id} needed to be deleted`);
    deleteMutation.mutate({
      id: file.id,
      isFolder: file.isFolder,
    });
  };
  return (
    <ul>
      <li onClick={handleUnTrash}>
        <MdRestore className="mini-icon" />
        Restore
      </li>
      <hr />
      <li onClick={handleDelete}>
        <MdDeleteForever className="mini-icon" />
        Delete
      </li>
    </ul>
  );
}

export default TrashPopup;
