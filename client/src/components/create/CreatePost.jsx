import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  styled,
  Box,
  TextareaAutosize,
  Button,
  InputBase,
  FormControl,
  Typography,
  Chip,
} from "@mui/material";
import {
  AddPhotoAlternate,
  Send,
  AutoAwesome,
  Close,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

// ── Layout ───────────────────────────────────────────────
const PageWrapper = styled(Box)(({ theme }) => ({
  maxWidth: 860,
  margin: "48px auto",
  padding: "0 24px 80px",
  [theme.breakpoints.down("md")]: {
    margin: "24px 0",
    padding: "0 16px 60px",
  },
}));

const PageHeader = styled(Box)`
  margin-bottom: 32px;
`;

const PageLabel = styled(Typography)`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #7c6fff;
  margin-bottom: 8px;
`;

const PageTitle = styled(Typography)`
  font-size: clamp(26px, 4vw, 36px);
  font-weight: 900;
  color: #1e2a3a;
  letter-spacing: -0.5px;
`;

// ── Image Upload ─────────────────────────────────────────
const ImageWrapper = styled(Box)`
  position: relative;
  width: 100%;
  height: 340px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 32px;
  background: #f3f0ff;
  border: 2px dashed #c4b5fd;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    border-color: #7c6fff;
    background: #ede9fe;
  }
  &:hover .overlay {
    opacity: 1;
  }
`;

const CoverImage = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ImageOverlay = styled(Box)`
  position: absolute;
  inset: 0;
  background: rgba(15, 12, 41, 0.55);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.25s ease;
  color: #fff;
  class: overlay;
`;

const EmptyImageState = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #7c6fff;
`;

// ── Toolbar ──────────────────────────────────────────────
const Toolbar = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  background: #fafafa;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  margin-bottom: 20px;
`;

const UploadBtn = styled(Button)`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #374151;
  font-size: 13px;
  font-weight: 600;
  text-transform: none;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    border-color: #7c6fff;
    background: #f3f0ff;
    color: #7c6fff;
  }
`;

const TitleInput = styled(InputBase)`
  flex: 1;
  font-size: 18px;
  font-weight: 600;
  color: #1e2a3a;

  input::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }
`;

const PublishBtn = styled(Button)`
  padding: 10px 28px;
  border-radius: 10px;
  background: linear-gradient(135deg, #7c6fff, #5b4fff);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-transform: none;
  white-space: nowrap;
  transition: all 0.25s ease;

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
  }
`;

// ── Category Badge ───────────────────────────────────────
const CategoryRow = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
`;

const CategoryChip = styled(Chip)`
  background: linear-gradient(135deg, #7c6fff22, #a78bfa22);
  border: 1px solid #c4b5fd;
  color: #5b4fff;
  font-weight: 600;
  font-size: 13px;
`;

const AuthorChip = styled(Box)`
  font-size: 13px;
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    color: #374151;
    font-weight: 600;
  }
`;

// ── Editor Area ──────────────────────────────────────────
const EditorCard = styled(Box)`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
`;

const EditorLabel = styled(Typography)`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #f3f4f6;
  }
`;

const StyledTextarea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  font-size: 17px;
  line-height: 1.9;
  color: #374151;
  font-family: "Georgia", serif;
  background: transparent;

  &::placeholder {
    color: #d1d5db;
  }
`;

const CharCount = styled(Typography)`
  font-size: 12px;
  color: #d1d5db;
  text-align: right;
  margin-top: 12px;
`;

// ── Error ────────────────────────────────────────────────
const ErrorBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  font-size: 14px;
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 16px;
`;

// ── initialPost ──────────────────────────────────────────
const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { account } = useContext(DataContext);

  useEffect(() => {
    setPost((prev) => ({
      ...prev,
      categories: location.search?.split("=")[1] || "All",
      username: account.username,
    }));
  }, [account.username, location.search]);

  // Handle file selection and preview
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create local preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const savePost = async () => {
    if (loading) return;
    if (!post.title.trim() || !post.description.trim()) {
      setError("Please fill in both title and description.");
      return;
    }
    if (!file) {
      setError("Please select a cover image.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // Create FormData with post data and file
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("description", post.description);
      formData.append("categories", post.categories);
      formData.append("username", post.username);
      formData.append("file", file);

      // Use axios directly for FormData upload with proper authentication
      const token = sessionStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:8000/create",
        formData,
        {
          headers: {
            "authorization": token,
          },
        },
      );
      if (response.status === 200) {
        navigate("/");
      } else {
        setError("Failed to create post.");
      }
    } catch (error) {
      console.error('Create post error:', error);
      const errorMsg = error.response?.data?.msg || error.response?.data?.details || error.message || "Network error. Please try again later.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setPost({ ...post, [e.target.name]: e.target.value });

  return (
    <PageWrapper>
      {/* ── Header ── */}
      <PageHeader>
        <PageLabel>New Article</PageLabel>
        <PageTitle>Create a Post</PageTitle>
      </PageHeader>

      {/* ── Cover Image ── */}
      <label htmlFor="fileInput" style={{ display: "block" }}>
        <ImageWrapper>
          {preview ? (
            <>
              <CoverImage src={preview} alt="cover" />
              <ImageOverlay className="overlay">
                <AddPhotoAlternate sx={{ fontSize: 36 }} />
                <Typography fontWeight={600} fontSize={14}>
                  Change Cover Image
                </Typography>
              </ImageOverlay>
            </>
          ) : (
            <EmptyImageState>
              <AddPhotoAlternate sx={{ fontSize: 52, opacity: 0.5 }} />
              <Typography fontWeight={600} fontSize={15} color="#7c6fff">
                Click to upload a cover image
              </Typography>
              <Typography fontSize={13} color="#9ca3af">
                Recommended: 1200 × 600px
              </Typography>
            </EmptyImageState>
          )}
        </ImageWrapper>
      </label>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileSelect}
      />

      {/* ── Category + Author ── */}
      <CategoryRow>
        <CategoryChip
          icon={<AutoAwesome sx={{ fontSize: "14px !important" }} />}
          label={post.categories || "All"}
          size="small"
        />
        <AuthorChip>
          By <span>{account.username}</span>
        </AuthorChip>
      </CategoryRow>

      {/* ── Error ── */}
      {error && (
        <ErrorBox>
          {error}
          <Close
            sx={{ fontSize: 18, cursor: "pointer" }}
            onClick={() => setError("")}
          />
        </ErrorBox>
      )}

      {/* ── Title + Publish Toolbar ── */}
      <Toolbar>
        <UploadBtn component="label">
          <AddPhotoAlternate sx={{ fontSize: 18 }} />
          Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileSelect}
          />
        </UploadBtn>

        <TitleInput
          name="title"
          placeholder="Enter your post title..."
          onChange={handleChange}
          value={post.title}
        />

        <PublishBtn
          onClick={savePost}
          disabled={loading}
          endIcon={<Send sx={{ fontSize: "16px !important" }} />}
        >
          {loading ? "Publishing..." : "Publish"}
        </PublishBtn>
      </Toolbar>

      {/* ── Body Editor ── */}
      <EditorCard>
        <EditorLabel>
          <AutoAwesome sx={{ fontSize: 13 }} /> Story
        </EditorLabel>
        <StyledTextarea
          minRows={12}
          placeholder="Tell your story... write something inspiring."
          name="description"
          onChange={handleChange}
          value={post.description}
        />
        <CharCount>{post.description.length} characters</CharCount>
      </EditorCard>
    </PageWrapper>
  );
};

export default CreatePost;
