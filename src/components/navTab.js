import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext } from '@material-ui/lab';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Customerlist from './customers';
import TrainingsList from './trainings'

function TabApp() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Customers" value="1" />
              <Tab label="Trainings" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1"><Customerlist /></TabPanel>
          <TabPanel value="2"><TrainingsList /></TabPanel>
        </TabContext>
      </Box>
    );
}
export default TabApp;