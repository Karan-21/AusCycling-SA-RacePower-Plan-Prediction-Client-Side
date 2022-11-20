import React from "react";

import { PanelContainer, PanelSection } from "../../../../components/Layouts";
import { StatCard, Table } from "../../../../components/StructuredData";
import { HStack, Tr, Td, Spinner } from "@chakra-ui/react";

// TODO: Use real data.
// Currently using fake data to test.
// In sprint 3, we will use axios to GET data from the backend.
const columns = ["Race", "Course", "Distance", "Time", "Speed", "Power"];

const DashboardPanel = ({
    numBikes,
    numCourses,
    numRaces,
    races,
    setTabIndex,
    isLoading,
}) => {
    return (
        <PanelContainer>
            <HStack w="100%" spacing={6}>
                <StatCard title="Bikes" onClick={() => setTabIndex(2)}>
                    {isLoading ? <Spinner /> : numBikes}
                </StatCard>
                <StatCard title="Courses" onClick={() => setTabIndex(3)}>
                    {isLoading ? <Spinner /> : numCourses}
                </StatCard>
                <StatCard title="Races" onClick={() => setTabIndex(4)}>
                    {isLoading ? <Spinner /> : numRaces}
                </StatCard>
            </HStack>
            <PanelSection title="Recent Race Plans">
                <Table columns={columns}>
                    {races.map(race => (
                        <Tr key={race.raceId}>
                            <Td>{race.race}</Td>
                            <Td>{race.course}</Td>
                            <Td>{race.distance}</Td>
                            <Td>{race.time}</Td>
                            <Td>{race.averageSpeed}</Td>
                            <Td>{race.averagePower}</Td>
                        </Tr>
                    ))}
                </Table>
            </PanelSection>
        </PanelContainer>
    );
};

export default DashboardPanel;
