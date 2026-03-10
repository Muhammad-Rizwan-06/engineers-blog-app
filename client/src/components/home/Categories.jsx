
import { Button, Box, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { categories } from '../../constants/data';

const StyledButton = styled(Button)`
    margin: 10px 0;
    width: 100%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
    &:hover {
        background: #4169E1;
    }
`;

const CategoryButton = styled(Button)`
    margin: 5px 0;
    width: 100%;
    justify-content: flex-start;
    text-transform: none;
    background: #f0f0f0;
    color: #333;
    &:hover {
        background: #e0e0e0;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    width: 100%;
`;

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    
    return (
        <Box sx={{ padding: 2, background: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <StyledLink to={`/create?category=${category || ''}`}>
                <StyledButton variant="contained">Create Blog</StyledButton>
            </StyledLink>
            
            <Box sx={{ marginTop: 2 }}>
                <StyledLink to={"/"}>
                    <CategoryButton>All Categories</CategoryButton>
                </StyledLink>
                {
                    categories.map(cat => (
                        <StyledLink key={cat.id} to={`/?category=${cat.type}`}>
                            <CategoryButton>{cat.type}</CategoryButton>
                        </StyledLink>
                    ))
                }
            </Box>
        </Box>
    )
}

export default Categories;