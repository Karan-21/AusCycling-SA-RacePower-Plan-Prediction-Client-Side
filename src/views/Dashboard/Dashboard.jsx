import React, { useState, useEffect } from "react";
import { CourseService, BikeService } from "../../services";
import { auth } from "../../services/Firebase/Firebase.service";
import {
    DashboardPanel,
    ProfilePanel,
    CoursePanel,
    RacePanel,
    BikePanel,
} from "./Panels";
import { ViewContainer } from "../../components/Layouts";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

const raceData = [
    {
        raceId: 1,
        race: "Race 01",
        course: "2017 TDU Stage 1",
        distance: "158.37",
        time: "04:09:35",
        averageSpeed: "38.07",
        averagePower: "260.09",
    },
    {
        raceId: 2,
        race: "Race 02",
        course: "2019 KPI Time Trial",
        distance: "121.94",
        time: "01:02:39",
        averageSpeed: "41.19",
        averagePower: "220.38",
    },
];
const courseData = [
    {
        courseId: 1,
        course: "2017 TDU Stage 1",
        distance: "158.37",
        city: "Adelaide",
        state: "South Australia",
        country: "Australia",
    },
    {
        courseId: 2,
        course: "2019 KPI Time Trial",
        distance: "121.94",
        city: "Melbourne",
        state: "Victoria",
        country: "Australia",
    },
];

const Dashboard = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [bikes, setBikes] = useState([]);
    const [courses, setCourses] = useState(courseData);
    const [races, setRaces] = useState(raceData);
    const [isLoading, setIsLoading] = useState(false);

    // Fetches the list of courses associated with a user for display.
    const fetchCourses = async () => {
        setIsLoading(true);
        try {
            const res = await CourseService.getCourses();
            await new Promise(res => setTimeout(res, 250));

            console.log(res);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetches the list of bikes associated with a user for display.
    const fetchBikes = async () => {
        setIsLoading(true);
        try {
            const res = await BikeService.getBikesForUser(auth?.currentUser.uid);
            await new Promise(res => setTimeout(res, 250));

            setBikes(res);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
        fetchBikes();
    }, []);

    return (
        <ViewContainer>
            <Tabs index={tabIndex} onChange={setTabIndex}>
                {/** Dashboard Panels Links */}
                <TabList>
                    <Tab>Dashboard</Tab>
                    <Tab>Profile</Tab>
                    <Tab>Bikes</Tab>
                    <Tab>Courses</Tab>
                    <Tab>Races</Tab>
                    <Tab>Race Analytics</Tab>
                </TabList>
                {/** Dashboard Panels */}
                <TabPanels pt={6}>
                    <TabPanel p={0}>
                        <DashboardPanel
                            numBikes={Object.keys(bikes).length}
                            numCourses={courses.length}
                            numRaces={races.length}
                            races={races}
                            setTabIndex={setTabIndex}
                            isLoading={isLoading}
                        />
                    </TabPanel>
                    <TabPanel p={0}>
                        <ProfilePanel />
                    </TabPanel>
                    <TabPanel p={0}>
                        <BikePanel bikes={bikes} setBikes={setBikes} />
                    </TabPanel>
                    <TabPanel p={0}>
                        <CoursePanel courses={courses} />
                    </TabPanel>
                    <TabPanel p={0}>
                        <RacePanel races={races} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </ViewContainer>
    );
};
export default Dashboard;
