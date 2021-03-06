import { Box, CircularProgress, Container, Table, TableCell, TableRow, Typography, TableBody, Grid, ButtonBase, styled} from '@mui/material';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const Img = styled('img')({
  display: 'block',
  maxWidth: '70%',
  maxHeight: '70%',
});


export const Character = () => {
  const [data, setData] = useState<any>();
  const [classRowData, setClassRowData] = useState<any[]>([]);
  const characterId = '5289891';
  
  const classColumns: GridColDef[] = [
    {
      field: 'class',
      headerName: 'Class',
      width: 150,
      editable: false    
    },
    {
      field: 'level',
      headerName: 'Level',
      width: 150,
      editable: false,
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://xivapi.com/character/${characterId}?data=AC,FR,PVP`);
      const newData = await response.json();
      setData(newData);

      const classData = (newData.Character.ClassJobs as any[]).map((x, i)  => {
        return { id: i, class: x.UnlockedState.Name, level: x.Level }
      });

      setClassRowData(classData);
    };    
  
    fetchData();  

  }, []);

  if(data != null){ 
    return (
      <Box sx={{ padding: 2 }}>
        <Typography
            variant="h3"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>      
            {data.Character.Name}
        </Typography>
        <Grid container>
          <Grid item>
            <Img alt="complex" src={data.Character.Portrait} />
          </Grid>
          <Grid item >
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell variant="head">Active Class</TableCell>
                  <TableCell>{data.Character.ActiveClassJob.UnlockedState.Name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Server</TableCell>
                  <TableCell>{data.Character.Server}</TableCell>
                </TableRow>
                <TableRow>
                  < TableCell variant="head">Name Day</TableCell>
                    <TableCell>{data.Character.Nameday}</TableCell>
                </TableRow>
              </TableBody>
            </Table>            
          </Grid>
        </Grid>
        <DataGrid sx={{ height: '50vh', width: '100%' }} columns={classColumns} rows={classRowData} checkboxSelection></DataGrid>           
      </Box>)
  }

  return (
    <Container sx={{ textAlign: 'center', padding: 2 }}>
      <CircularProgress sx={{ margin: '0px auto' }} />
    </Container>
  );
}