import { useContext, useState } from "react";
import { Typography, Box, styled } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { API } from "../../../service/api";
import { DataContext } from "../../../context/DataProvider";

// ── Card ─────────────────────────────────────────────────
const Card = styled(Box)`
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 14px;
  padding: 16px 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }
`;

// ── Header ────────────────────────────────────────────────
const Header = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const Avatar = styled(Box)`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7c6fff, #5b4fff);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
`;

const Meta = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
`;

const Name = styled(Typography)`
  font-size: 14px;
  font-weight: 700;
  color: #1e2a3a;
  line-height: 1;
`;

const DateText = styled(Typography)`
  font-size: 12px;
  color: #9ca3af;
`;

const DeleteBtn = styled(Box)`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #d1d5db;
  transition: all 0.2s ease;
  flex-shrink: 0;

  svg {
    font-size: 17px;
  }

  &:hover {
    background: #fef2f2;
    color: #dc2626;
  }
`;

// ── Body ──────────────────────────────────────────────────
const Body = styled(Typography)`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  padding-left: 44px;
`;

// ── Component ─────────────────────────────────────────────
const Comment = ({ comment, setToggle }) => {
  const { account } = useContext(DataContext);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const removeComment = async () => {
    if (deleteLoading) return;
    if (!window.confirm("Delete this comment?")) return;

    setDeleteLoading(true);
    try {
      const response = await API.deleteComment(comment._id);
      if (response.isSuccess) {
        setToggle((prev) => !prev);
      } else {
        alert(response.msg || "Failed to delete comment.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const avatarLetter = comment.name?.charAt(0).toUpperCase() || "?";
  const isOwner = comment.name === account.username;

  return (
    <Card>
      <Header>
        <Avatar>{avatarLetter}</Avatar>
        <Meta>
          <Name>@{comment.name}</Name>
          <DateText>{new Date(comment.date).toDateString()}</DateText>
        </Meta>
        {isOwner && (
          <DeleteBtn onClick={removeComment} title="Delete comment">
            <Delete />
          </DeleteBtn>
        )}
      </Header>
      <Body>{comment.comments}</Body>
    </Card>
  );
};

export default Comment;
