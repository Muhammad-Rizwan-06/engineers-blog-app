import { useState, useEffect, useContext } from "react";
import { Box, Typography, styled, Skeleton, Chip } from "@mui/material";
import {
  Delete,
  Edit,
  CalendarToday,
  Person,
  ArrowBack,
  Category,
} from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import Comments from "./comments/Comments";

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

// ── Hero Image ───────────────────────────────────────────
const HeroWrapper = styled(Box)`
  position: relative;
  width: 100%;
  height: 420px;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 36px;
`;

const HeroImage = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const HeroOverlay = styled(Box)`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 40%,
    rgba(15, 12, 41, 0.85) 100%
  );
`;

const HeroBottom = styled(Box)`
  position: absolute;
  bottom: 28px;
  left: 28px;
  right: 28px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
`;

const CategoryBadge = styled(Chip)`
  background: rgba(124, 111, 255, 0.85);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ActionRow = styled(Box)`
  display: flex;
  gap: 8px;
`;

const ActionBtn = styled(Box)`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);

  svg {
    font-size: 18px;
  }
`;

const EditBtn = styled(ActionBtn)`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff;

  &:hover {
    background: rgba(124, 111, 255, 0.8);
    border-color: transparent;
  }
`;

const DeleteBtn = styled(ActionBtn)`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff;

  &:hover {
    background: rgba(220, 38, 38, 0.8);
    border-color: transparent;
  }
`;

// ── Back Button ──────────────────────────────────────────
const BackBtn = styled(Box)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #9ca3af;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 28px;
  transition: color 0.2s ease;

  svg {
    font-size: 16px;
  }

  &:hover {
    color: #7c6fff;
  }
`;

// ── Article Header ───────────────────────────────────────
const ArticleTitle = styled(Typography)`
  font-size: clamp(26px, 4vw, 40px);
  font-weight: 900;
  color: #1e2a3a;
  line-height: 1.2;
  letter-spacing: -0.5px;
  margin-bottom: 20px;
`;

const MetaRow = styled(Box)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 16px 20px;
  background: #f9fafb;
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  margin-bottom: 36px;
`;

const MetaItem = styled(Box)`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;

  svg {
    font-size: 15px;
    color: #7c6fff;
  }

  a {
    color: #7c6fff;
    font-weight: 700;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const MetaDot = styled(Box)`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #d1d5db;
`;

// ── Article Body ─────────────────────────────────────────
const ArticleBody = styled(Box)`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 36px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  margin-bottom: 48px;
`;

const BodyLabel = styled(Typography)`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 20px;
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

const BodyText = styled(Typography)`
  font-size: 17px;
  line-height: 1.9;
  color: #374151;
  font-family: "Georgia", serif;
  white-space: pre-line;
`;

// ── Comments Divider ─────────────────────────────────────
const CommentsDivider = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const CommentsLabel = styled(Typography)`
  font-size: 18px;
  font-weight: 800;
  color: #1e2a3a;
  white-space: nowrap;
`;

const DividerLine = styled(Box)`
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, #e5e7eb, transparent);
`;

// ── Loading Skeleton ─────────────────────────────────────
const LoadingSkeleton = () => (
  <Box>
    <Skeleton
      variant="rectangular"
      height={420}
      sx={{ borderRadius: 6, mb: 4 }}
    />
    <Skeleton variant="text" width="70%" height={48} sx={{ mb: 1 }} />
    <Skeleton
      variant="rectangular"
      height={56}
      sx={{ borderRadius: 3, mb: 4 }}
    />
    <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 3 }} />
  </Box>
);

// ── Error State ──────────────────────────────────────────
const ErrorState = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 12px;
  text-align: center;
`;

// ── Component ────────────────────────────────────────────
const DetailView = () => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { account } = useContext(DataContext);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        let response = await API.getPostById(id);
        if (response.isSuccess) setPost(response.data);
        else setError("Failed to load post.");
      } catch {
        setError("Network error while loading post.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const deleteBlog = async () => {
    if (deleteLoading) return;
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setDeleteLoading(true);
    try {
      const response = await API.deletePost(post._id);
      if (response.isSuccess) {
        navigate("/");
      } else if (response.isError) {
        alert(response.msg || "Failed to delete post. Please try again.");
      } else {
        alert("Failed to delete post. Please try again.");
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert("Network error. Please try again later.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const isOwner = account.username === post.username;

  return (
    <PageWrapper>
      {/* ── Back ── */}
      <BackBtn onClick={() => navigate(-1)}>
        <ArrowBack /> Back to posts
      </BackBtn>

      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <ErrorState>
          <Typography fontSize={48}>😕</Typography>
          <Typography fontSize={20} fontWeight={800} color="#1e2a3a">
            Post not found
          </Typography>
          <Typography fontSize={14} color="#9ca3af">
            {error}
          </Typography>
        </ErrorState>
      ) : (
        <>
          {/* ── Hero ── */}
          <HeroWrapper>
            <HeroImage
              src={
                post.picture ||
                "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?w=1000&q=80"
              }
              alt={post.title}
            />
            <HeroOverlay />
            <HeroBottom>
              <CategoryBadge
                icon={<Category sx={{ fontSize: "13px !important" }} />}
                label={post.categories || "General"}
                size="small"
              />
              {isOwner && (
                <ActionRow>
                  <Link
                    to={`/update/${post._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <EditBtn>
                      <Edit />
                    </EditBtn>
                  </Link>
                  <DeleteBtn onClick={deleteBlog}>
                    <Delete />
                  </DeleteBtn>
                </ActionRow>
              )}
            </HeroBottom>
          </HeroWrapper>

          {/* ── Title ── */}
          <ArticleTitle>{post.title}</ArticleTitle>

          {/* ── Meta ── */}
          <MetaRow>
            <MetaItem>
              <Person />
              <Link to={`/?username=${post.username}`}>{post.username}</Link>
            </MetaItem>
            <MetaDot />
            <MetaItem>
              <CalendarToday />
              {new Date(post.createdDate).toDateString()}
            </MetaItem>
            <MetaDot />
            <MetaItem>
              {Math.ceil(post.description?.split(" ").length / 200)} min read
            </MetaItem>
          </MetaRow>

          {/* ── Body ── */}
          <ArticleBody>
            <BodyLabel>Article</BodyLabel>
            <BodyText>{post.description}</BodyText>
          </ArticleBody>

          {/* ── Comments ── */}
          <CommentsDivider>
            <CommentsLabel>Comments</CommentsLabel>
            <DividerLine />
          </CommentsDivider>
          <Comments post={post} />
        </>
      )}
    </PageWrapper>
  );
};

export default DetailView;
