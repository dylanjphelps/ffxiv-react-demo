import { Box } from '@mui/material';
import { NavBar } from '../NavBar/NavBar';
import { Route, Routes } from 'react-router';
import { Item } from '../Item/Item';
import { FreeCompany } from '../FreeCompany/FreeCompany';

export const Layout = () => {
  return (
    <Box sx={{ padding: 2 }}>
        <NavBar />
        <Box component="main" sx={{ width: '100%' }}>
            <Routes>
                <Route path="item" element={<Item />} />
                <Route path="freeCompany" element={<FreeCompany />} />
            </Routes>
        </Box>
    </Box>
  );
};