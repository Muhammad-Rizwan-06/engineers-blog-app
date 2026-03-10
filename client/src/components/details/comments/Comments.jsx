import { useState, useEffect, useContext } from "react";
import { Box, styled, Typography } from "@mui/material";
import { Send, ChatBubbleOutline } from "@mui/icons-material";
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";
import Comment from "./Comment";

// ── Wrapper ──────────────────────────────────────────────
const Wrapper = styled(Box)`
  margin-top: 16px;
`;

// ── Compose Box ──────────────────────────────────────────
const ComposeCard = styled(Box)`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  margin-bottom: 28px;
`;

const ComposeHeader = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
`;

const Avatar = styled(Box)`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7c6fff, #5b4fff);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  flex-shrink: 0;
`;

const ComposerLabel = styled(Typography)`
  font-size: 13px;
  font-weight: 600;
  color: #1e2a3a;

  span {
    color: #7c6fff;
  }
`;

const TextAreaWrapper = styled(Box)`
  position: relative;
`;

const StyledTextArea = styled("textarea")`
  width: 100%;
  min-height: 90px;
  padding: 14px 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  font-size: 14px;
  font-family: inherit;
  color: #374151;
  background: #fafafa;
  resize: none;
  outline: none;
  box-sizing: border-box;
  transition: all 0.2s ease;
  line-height: 1.6;

  &:focus {
    border-color: #7c6fff;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(124, 111, 255, 0.1);
  }

  &::placeholder {
    color: #d1d5db;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ComposeFooter = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const CharCount = styled(Typography)`
  font-size: 12px;
  color: #d1d5db;
`;

const PostBtn = styled("button")`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 22px;
  border-radius: 10px;
  background: linear-gradient(135deg, #7c6fff, #5b4fff);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: inherit;

  svg {
    font-size: 16px;
  }

  &:hover {
    background: linear-gradient(135deg, #6b5fff, #4a3ffe);
    box-shadow: 0 6px 20px rgba(124, 111, 255, 0.4);
    transform: translateY(-1px);
  }

  &:disabled {
    background: #e5e7eb;
    color: #9ca3af;
    transform: none;
    box-shadow: none;
    cursor: not-allowed;
  }
`;

// ── Error ────────────────────────────────────────────────
const ErrorBox = styled(Box)`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  font-size: 13px;
  padding: 10px 14px;
  border-radius: 10px;
  margin-bottom: 16px;
`;

// ── Comments List ────────────────────────────────────────
const ListHeader = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
`;

const ListTitle = styled(Typography)`
  font-size: 15px;
  font-weight: 800;
  color: #1e2a3a;
  white-space: nowrap;
`;

const CountBadge = styled(Box)`
  background: linear-gradient(135deg, #7c6fff22, #a78bfa22);
  border: 1px solid #c4b5fd;
  color: #5b4fff;
  font-size: 12px;
  font-weight: 700;
  padding: 2px 10px;
  border-radius: 20px;
`;

const DividerLine = styled(Box)`
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, #e5e7eb, transparent);
`;

const EmptyState = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 40px 20px;
  color: #9ca3af;
  text-align: center;
`;

// ── Initial Value ────────────────────────────────────────
const initialValue = {
  name: "",
  postId: "",
  date: new Date(),
  comments: "",
};

// ── Component ────────────────────────────────────────────
const Comments = ({ post }) => {
  const [comment, setComment] = useState(initialValue);
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { account } = useContext(DataContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await API.getAllComments(post._id);
        if (response.isSuccess) {
          setComments(response.data);
          setError("");
        } else {
          setError("Failed to load comments.");
        }
      } catch {
        setError("Network error while loading comments.");
      }
    };
    getData();
  }, [toggle, post]);

  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.username,
      postId: post._id,
      comments: e.target.value,
    });
  };

  const addComment = async () => {
    if (loading) return;
    if (!comment.comments.trim()) {
      setError("Please enter a comment.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await API.newComment(comment);
      if (response.isSuccess) {
        setComment(initialValue);
        setToggle((prev) => !prev);
      } else {
        setError("Failed to post comment. Please try again.");
      }
    } catch {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // First letter of username for avatar
  const avatarLetter = account.username?.charAt(0).toUpperCase() || "?";

  return (
    <Wrapper>
      {/* ── Compose ── */}
      <ComposeCard>
        <ComposeHeader>
          <Avatar>{avatarLetter}</Avatar>
          <ComposerLabel>
            Commenting as <span>@{account.username}</span>
          </ComposerLabel>
        </ComposeHeader>

        <TextAreaWrapper>
          <StyledTextArea
            placeholder="What's on your mind?"
            onChange={handleChange}
            value={comment.comments}
            disabled={loading}
          />
        </TextAreaWrapper>

        <ComposeFooter>
          <CharCount>{comment.comments.length} / 500</CharCount>
          <PostBtn onClick={addComment} disabled={loading}>
            <Send />
            {loading ? "Posting..." : "Post Comment"}
          </PostBtn>
        </ComposeFooter>
      </ComposeCard>

      {/* ── Error ── */}
      {error && <ErrorBox>{error}</ErrorBox>}

      {/* ── List ── */}
      <ListHeader>
        <ListTitle>Comments</ListTitle>
        {comments.length > 0 && <CountBadge>{comments.length}</CountBadge>}
        <DividerLine />
      </ListHeader>

      {comments.length > 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              setToggle={setToggle}
            />
          ))}
        </Box>
      ) : (
        <EmptyState>
          <ChatBubbleOutline sx={{ fontSize: 40, opacity: 0.3 }} />
          <Typography fontSize={14} fontWeight={600}>
            No comments yet
          </Typography>
          <Typography fontSize={13}>
            Be the first to share your thoughts!
          </Typography>
        </EmptyState>
      )}
    </Wrapper>
  );
};

export default Comments;
