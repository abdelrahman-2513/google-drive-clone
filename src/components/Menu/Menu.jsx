import "./Menu.css";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { BsStarFill, BsThreeDotsVertical } from "react-icons/bs";
import { CgRename } from "react-icons/cg";
import { TbTrashFilled } from "react-icons/tb";
import RenamePopup from "../RenamePopup/RenamePopup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { starFile, trashFile } from "../../assets/Api/firestore";
import { UserAuth } from "../../context/AuthContext";
import { MdNotStarted } from "react-icons/md";
import TrashPopup from "../TrashPopup/TrashPopup";
import { useNavigate, useParams } from "react-router";

function Menu({ file }) {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <div>
        <BsThreeDotsVertical
          className="mini-icon"
          title="Options"
          onClick={() => setOpenMenu((t) => !t)}
        />
      </div>
      {openMenu && <SmallMenu file={file} setOpenMenu={setOpenMenu} />}
    </>
  );
}

function SmallMenu({ file, setOpenMenu: setOpen }) {
  const [openpopUp, setOpenPopup] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const { folderId } = useParams();
  const queryClient = useQueryClient();
  const { user } = UserAuth();
  const starMutation = useMutation({
    mutationKey: ["starred"],
    mutationFn: (data) => starFile(data.id, !data.isStarred, data.isFolder),
    onSuccess: () => {
      if (file.isFolder) {
        queryClient.setQueryData(
          ["starred-folders", user?.email],
          (oldData) => {
            let newData = [];
            if (file.isStarred) {
              newData = oldData.filter((f) => f.id !== file.id);
              return newData;
            }
            const newFile = { ...file, isStarred: true };
            newData = [newFile, ...oldData];
            return newData;
          }
        );
      } else {
        queryClient.setQueryData(["starred-files", user?.email], (oldData) => {
          let newData = [];
          if (file.isStarred) {
            newData = oldData.filter((f) => f.id !== file.id);
            return newData;
          }
          const newFile = { ...file, isStarred: true };
          newData = [newFile, ...oldData];
          return newData;
        });
      }
    },
    onError: (err) => {
      console.log(err);

      toast.error(err.message);
    },
  });
  const trashMutation = useMutation({
    mutationKey: ["trashed"],
    mutationFn: (data) => trashFile(data.id, !data.isTrashed, data.isFolder),
    onSuccess: () => {
      if (file.isFolder) {
        queryClient.setQueryData(
          ["folders", user?.email, folderId || "0"],
          (oldData) => {
            let newData = oldData.filter((f) => f.id !== file.id);
            return newData;
          }
        );
        queryClient.setQueryData(
          ["trashed-folders", user?.email],
          (oldData) => {
            const newFile = { ...file, isTrashed: true };
            let newData = [newFile, ...oldData];
            return newData;
          }
        );
        queryClient.setQueryData(
          ["starred-folders", user?.email],
          (oldData) => {
            if (file.isStarred) {
              let newData = [];
              newData = oldData.filter((f) => f.id !== file.id);
              return newData;
            }
          }
        );
      } else {
        queryClient.setQueryData(
          ["files", user?.email, folderId || "0"],
          (oldData) => {
            let newData = oldData.filter((f) => f.id !== file.id);
            return newData;
          }
        );
        queryClient.setQueryData(["trashed-files", user?.email], (oldData) => {
          const newFile = { ...file, isTrashed: true };
          let newData = [newFile, ...oldData];
          return newData;
        });
        queryClient.setQueryData(["starred-files", user?.email], (oldData) => {
          if (file.isStarred) {
            let newData = [];
            newData = oldData.filter((f) => f.id !== file.id);
            return newData;
          }
        });
      }
    },
    onError: (err) => {
      console.log(err);

      toast.error(err.message);
    },
  });
  const handleOpen = () => {
    if (file.isFolder) {
      console.log(file.id, file.folderName);
      navigate(`/folders/${file.folderName}/${file.id}`);
    } else window.open(file.fileLink, "_blank");
    setOpen(false);
  };
  const handleDownload = () => {
    if (file.isFolder) console.log(folder);
    else {
      const link = document.createElement("a");
      link.href = file.fileLink;
      link.download;
      link.click();
    }
    setOpen(false);
  };
  const handleStarred = () => {
    console.log(`the file with id : ${file.id} is wanted to be starred`);
    starMutation.mutate({
      id: file.id,
      isStarred: file.isStarred,
      isFolder: file.isFolder,
    });
    console.log({
      id: file.id,
      isStarred: file.isStarred,
      isFolder: file.isFolder,
    });
    setOpen(false);
  };
  const handleTrashed = () => {
    console.log(`the file with id : ${file.id} is wanted to be starred`);
    trashMutation.mutate({
      id: file.id,
      isTrashed: file.isTrashed,
      isFolder: file.isFolder,
    });
    console.log({
      id: file.id,
      isTrashed: file.isTrashed,
      isFolder: file.isFolder,
    });
    setOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);
  return (
    <div className="small-menu1" ref={menuRef}>
      {!file.isTrashed ? (
        <ul>
          <li className="last-item" onClick={handleOpen}>
            Open
          </li>
          <hr />
          <li
            className={file.isFolder ? "folder-unable" : ""}
            onClick={handleDownload}
          >
            <BiDownload className="mini-icon" />
            Download
          </li>
          <li onClick={() => setOpenPopup((t) => !t)}>
            <CgRename className="mini-icon" />
            Rename
          </li>
          {!file.isStarred ? (
            <li onClick={handleStarred}>
              <BsStarFill className="mini-icon" />
              Add to star
            </li>
          ) : (
            <li onClick={handleStarred}>
              <MdNotStarted className="mini-icon" />
              Un star
            </li>
          )}
          <hr />
          <li onClick={handleTrashed}>
            <TbTrashFilled className="mini-icon" />
            Move to Trash
          </li>
        </ul>
      ) : (
        <TrashPopup file={file} setPopup={setOpen} />
      )}
      {openpopUp && <RenamePopup file={file} setPopup={setOpenPopup} />}
    </div>
  );
}

export default Menu;
