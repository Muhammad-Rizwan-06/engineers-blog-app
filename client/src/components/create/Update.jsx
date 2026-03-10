import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  styled,
  TextareaAutosize,
  Button,
  FormControl,
  InputBase,
  Typography,
  Skeleton,
} from "@mui/material";
import {
  AddPhotoAlternate,
  Save,
  AutoAwesome,
  Close,
  ArrowBack,
  Edit,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../service/api";

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
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 32px;
  gap: 16px;
`;

const HeaderLeft = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PageLabel = styled(Typography)`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #f59e0b;
  margin-bottom: 2px;
`;

const PageTitle = styled(Typography)`
  font-size: clamp(26px, 4vw, 36px);
  font-weight: 900;
  color: #1e2a3a;
  letter-spacing: -0.5px;
`;

const BackBtn = styled(Button)`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #6b7280;
  font-size: 13px;
  font-weight: 600;
  text-transform: none;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    border-color: #f59e0b;
    background: #fffbeb;
    color: #f59e0b;
  }
`;

// ── Image Upload ─────────────────────────────────────────
const ImageWrapper = styled(Box)`
  position: relative;
  width: 100%;
  height: 340px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 32px;
  background: #fffbeb;
  border: 2px dashed #fcd34d;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    border-color: #f59e0b;
    background: #fef3c7;
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
`;

const EmptyImageState = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #f59e0b;
`;

// ── Edit Badge ───────────────────────────────────────────
const EditBadge = styled(Box)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #fffbeb;
  border: 1px solid #fcd34d;
  color: #d97706;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 20px;
  margin-bottom: 20px;

  svg {
    font-size: 14px;
  }
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
    border-color: #f59e0b;
    background: #fffbeb;
    color: #f59e0b;
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

const UpdateBtn = styled(Button)`
  padding: 10px 28px;
  border-radius: 10px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-transform: none;
  white-space: nowrap;
  transition: all 0.25s ease;

  &:hover {
    background: linear-gradient(135deg, #d97706, #b45309);
    box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
    transform: translateY(-1px);
  }

  &:disabled {
    background: #e5e7eb;
    color: #9ca3af;
    transform: none;
    box-shadow: none;
  }
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

// ── Editor ───────────────────────────────────────────────
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

// ── Loading Skeleton ─────────────────────────────────────
const LoadingSkeleton = () => (
  <Box>
    <Skeleton
      variant="rectangular"
      height={340}
      sx={{ borderRadius: 5, mb: 4 }}
    />
    <Skeleton
      variant="rectangular"
      height={60}
      sx={{ borderRadius: 3, mb: 2 }}
    />
    <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 3 }} />
  </Box>
);

// ── initialPost ──────────────────────────────────────────
const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "codeforinterview",
  categories: "Tech",
  createdDate: new Date(),
};

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setFetchLoading(true);
      try {
        let response = await API.getPostById(id);
        if (response.isSuccess) {
          setPost(response.data);
          // Set initial preview to existing image
          setPreview(response.data.picture || "");
        } else {
          setError("Failed to load post for editing.");
        }
      } catch {
        setError("Network error while loading post.");
      } finally {
        setFetchLoading(false);
      }
    };
    fetchData();
  }, [id]);

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

  const updateBlogPost = async () => {
    if (loading) return;
    if (!post.title.trim() || !post.description.trim()) {
      setError("Please fill in both title and description.");
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
      // Only append file if a new one is selected
      if (file) {
        formData.append("file", file);
      }

      // Use axios directly for FormData upload with proper authentication
      const token = sessionStorage.getItem("accessToken");
      const response = await axios.put(
        `http://localhost:8000/update/${id}`,
        formData,
        {
          headers: {
            "authorization": token,
          },
        },
      );

      if (response.status === 200) navigate(`/details/${id}`);
      else setError("Failed to update post.");
    } catch (error) {
      console.error("Update error:", error);
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
        <HeaderLeft>
          <PageLabel>Editing Article</PageLabel>
          <PageTitle>Update Post</PageTitle>
        </HeaderLeft>
        <BackBtn onClick={() => navigate(`/details/${id}`)}>
          <ArrowBack sx={{ fontSize: 16 }} /> Back
        </BackBtn>
      </PageHeader>

      {fetchLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
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
                  <Typography fontWeight={600} fontSize={15}>
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

          {/* ── Edit Badge ── */}
          <EditBadge>
            <Edit /> Editing: {post.categories}
          </EditBadge>

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

          {/* ── Toolbar ── */}
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
              placeholder="Post title..."
              onChange={handleChange}
              value={post.title}
            />

            <UpdateBtn
              onClick={updateBlogPost}
              disabled={loading}
              endIcon={<Save sx={{ fontSize: "16px !important" }} />}
            >
              {loading ? "Updating..." : "Update"}
            </UpdateBtn>
          </Toolbar>

          {/* ── Editor ── */}
          <EditorCard>
            <EditorLabel>
              <AutoAwesome sx={{ fontSize: 13 }} /> Story
            </EditorLabel>
            <StyledTextarea
              minRows={12}
              placeholder="Tell your story..."
              name="description"
              onChange={handleChange}
              value={post.description}
            />
            <CharCount>{post.description.length} characters</CharCount>
          </EditorCard>
        </>
      )}
    </PageWrapper>
  );
};

export default Update;
