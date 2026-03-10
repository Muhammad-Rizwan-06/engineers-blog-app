import { useEffect, useState } from "react";
import { Grid, Box, Typography, Skeleton, styled } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { API } from "../../../service/api";
import Post from "./Post";

const Wrapper = styled(Box)`
  padding: 40px 20px;
  min-height: 60vh;
`;

const PostGrid = styled(Grid)`
  animation: fadeIn 0.4s ease;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const EmptyState = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  gap: 16px;
  text-align: center;
`;

const EmptyIcon = styled(Typography)`
  font-size: 64px;
  line-height: 1;
`;

const EmptyTitle = styled(Typography)`
  font-size: 22px;
  font-weight: 700;
  color: #1e2a3a;
`;

const EmptySubtitle = styled(Typography)`
  font-size: 15px;
  color: #9ca3af;
  max-width: 320px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;

  & > * {
    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease;
  }

  &:hover > * {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  }
`;

const SectionHeader = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
`;

const SectionTitle = styled(Typography)`
  font-size: 20px;
  font-weight: 700;
  color: #1e2a3a;
  letter-spacing: 0.5px;
`;

const SectionPill = styled(Box)`
  background: linear-gradient(135deg, #7c6fff, #a78bfa);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 4px 12px;
  border-radius: 20px;
`;

const Accent = styled(Box)`
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, #e5e7eb, transparent);
`;

// Skeleton card while loading
const SkeletonCard = () => (
  <Box sx={{ borderRadius: 3, overflow: "hidden" }}>
    <Skeleton
      variant="rectangular"
      height={180}
      sx={{ borderRadius: "12px 12px 0 0" }}
    />
    <Box sx={{ p: 1.5 }}>
      <Skeleton variant="text" width="60%" height={20} />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="75%" />
    </Box>
  </Box>
);

const Posts = () => {
  const [posts, getPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      let response = await API.getAllPosts({ category: category || "" });
      if (response.isSuccess) {
        getPosts(response.data);
      } else {
        setError(response.msg || "Failed to fetch posts");
        console.error("Error fetching posts:", response);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);

  return (
    <Wrapper>
      {/* Section Header */}
      <SectionHeader>
        <SectionTitle>{category ? category : "All Posts"}</SectionTitle>
        {posts.length > 0 && <SectionPill>{posts.length} Articles</SectionPill>}
        <Accent />
      </SectionHeader>

      {/* Loading skeletons */}
      {loading ? (
        <Grid container spacing={3}>
          {[...Array(8)].map((_, i) => (
            <Grid item lg={4} sm={6} xs={12} key={i}>
              <SkeletonCard />
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <EmptyState>
          <EmptyIcon>⚠️</EmptyIcon>
          <EmptyTitle>Error loading posts</EmptyTitle>
          <EmptySubtitle>{error}</EmptySubtitle>
        </EmptyState>
      ) : posts?.length ? (
        <PostGrid container spacing={3}>
          {posts.map((post) => (
            <Grid item lg={4} sm={6} xs={12} key={post._id}>
              <StyledLink to={`details/${post._id}`}>
                <Post post={post} />
              </StyledLink>
            </Grid>
          ))}
        </PostGrid>
      ) : (
        <EmptyState>
          <EmptyIcon>📭</EmptyIcon>
          <EmptyTitle>No posts found</EmptyTitle>
          <EmptySubtitle>
            There are no articles in{" "}
            <strong>{category || "this category"}</strong> yet. Check back soon!
          </EmptySubtitle>
        </EmptyState>
      )}
    </Wrapper>
  );
};

export default Posts;
