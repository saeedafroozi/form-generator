import * as React from 'react'
import Editor from './Editor'
import { Control } from '../../constants/index'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface DisplayProps {
    items: Control[]
}
const Display = ({ items }: DisplayProps) => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return <div className="display">
        <AppBar position="static" className="tabs" color="default">
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
            >
                <Tab className="tab" label="Editor" >
                </Tab>
                <Tab className="tab" label="Responses" />
            </Tabs>
        </AppBar>

        <TabPanel value={value} index={0} >
            <Editor activeTab={value} />
        </TabPanel>
        <TabPanel value={value} index={1} >
            "HIii Responses"
        </TabPanel>
    </div>
}
interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}
export default Display;