import { Box, CircularProgress, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export const FreeCompany = () => {
  const [data, setData] = useState<any>();
  const [rowData, setRowData] = useState<any[]>([]);
  const freeCompanyId = '9233786610993180101';

  const columns: GridColDef[] = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 150,
      editable: false,
      renderCell: (params) => <img src={params.value} />      
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: false,
    },
    {
      field: 'rank',
      headerName: 'Rank',
      width: 150,
      editable: false,
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://xivapi.com/freecompany/${freeCompanyId}?data=FCM`);
      const newData = await response.json();
      setData(newData);

      const rows = (newData.FreeCompanyMembers as any[]).map(x  => {
        return { id: x.ID, avatar: x.Avatar, name: x.Name, rank: x.Rank }
      });
  
      setRowData(rows);
    };    
  
    fetchData();  

  }, []);

  if(data != null){ 
    return (
      <Box sx={{ padding: 2 }}>
          <span>{data.FreeCompany.Name} Members</span>     
          <DataGrid sx={{ height: '50vh', width: '100%' }} columns={columns} rows={rowData} checkboxSelection></DataGrid>    
      </Box>)
  }

  return (
    <Container sx={{ textAlign: 'center', padding: 2 }}>
      <CircularProgress sx={{ margin: '0px auto' }} />
    </Container>
  );
}