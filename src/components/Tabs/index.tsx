import {
    PropsWithChildren,
    ReactElement,
    SyntheticEvent,
    useState,
} from 'react';

import TabContext from '@mui/lab/TabContext';
import Tab from '@mui/material/Tab';
import MaterialTabs from '@mui/material/Tabs';

type TabsProps = {
    categories: string[];
};

export default function Tabs({
    categories,
    children,
}: PropsWithChildren<TabsProps>): ReactElement {
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (_: SyntheticEvent, newTab: number): void => {
        setCurrentTab(newTab);
    };

    return (
        <TabContext value={`${currentTab}`}>
            <MaterialTabs
                value={currentTab}
                onChange={handleTabChange}
                textColor="primary"
                variant="scrollable"
                TabIndicatorProps={{ style: { display: 'none' } }}
                scrollButtons={false}
                centered={categories.length === 1}
                sx={{ minHeight: '0px' }}>
                {categories.map((name) => (
                    <Tab
                        key={name}
                        label={name}
                        sx={{
                            padding: '0.5rem 1rem',
                            minHeight: '0px',
                            minWidth: '0px',
                            textTransform: 'capitalize',
                        }}
                    />
                ))}
            </MaterialTabs>

            {children}
        </TabContext>
    );
}
