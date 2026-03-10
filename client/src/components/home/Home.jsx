
import { Grid, Box, styled, Container } from '@mui/material';

//components
import Banner from '../banner/Banner';
import Categories from './Categories';
import Posts from './post/Posts';

const HomeContainer = styled(Box)`
    background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
    min-height: 100vh;
`;

const Home = () => {

    return (
        <HomeContainer>
            <Banner />
            <Container maxWidth="lg" sx={{ paddingY: 4 }}>
                <Grid container spacing={3}>
                    <Grid item lg={2} xs={12} sm={2}>
                        <Categories />
                    </Grid>
                    <Grid item xs={12} sm={10} lg={10}>
                        <Posts />
                    </Grid>
                </Grid>
            </Container>
        </HomeContainer>
    )
}

export default Home;