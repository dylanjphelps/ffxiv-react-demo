import { AppBar, Container, Toolbar, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router';

const pages = [
    {
        Name: 'Character',
        Path: "character"
    }, 
    {
        Name: 'Free Company',
        Path: "freeCompany"
    }
];

export const NavBar = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>      
                        Final Fantasy XIV
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.Name}
                                onClick ={() => navigate("./" + page.Path)}
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                                {page.Name}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
