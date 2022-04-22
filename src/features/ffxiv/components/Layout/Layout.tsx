import { Box } from '@mui/material';
import { NavBar } from '../NavBar/NavBar';
import { Route, Routes } from 'react-router';
import { Character } from '../Character/Character';
import { FreeCompany } from '../FreeCompany/FreeCompany';

export const Layout = () => {
  return (
    <Box sx={{ padding: 2 }}>
        <NavBar />
        <Box component="main" sx={{ width: '100%' }}>
            <Routes>
                <Route path="character" element={<Character />} />
                <Route path="freeCompany" element={<FreeCompany />} />
            </Routes>
        </Box>
    </Box>
  );
};