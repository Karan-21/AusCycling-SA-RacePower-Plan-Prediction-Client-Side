import React from "react";

import { PanelSection } from "../../../../components/Layouts";
import { VStack, HStack, Box } from "@chakra-ui/react";

const rowData = [
    { label: "Bike Name", accessor: "bikeName" },
    { label: "Course Name", accessor: "courseName" },
    { label: "Distance", accessor: "distance" },
    { label: "Humidity", accessor: "humidity" },
    { label: "Race Name", accessor: "raceName" },
    { label: "Race Time", accessor: "raceTime" },
    { label: "Race Type", accessor: "raceType" },
    { label: "Road Condition", accessor: "roadCondition" },
    { label: "Temperature", accessor: "temperature" },
    { label: "Terrain", accessor: "terrain" },
    { label: "Wind Direction", accessor: "windDirection" },
    { label: "Wind Speed", accessor: "windSpeed" },
];

const RacePanelInfo = ({ userInfo }) => {
    return (
        <PanelSection title="Race Information">
            <VStack p={6} spacing={6} alignItems="flex-start">
                {rowData.map(({ label, accessor }) => {
                    const value = userInfo[accessor];

                    return (
                        <HStack w="100%" justifyContent="space-between" key={accessor}>
                            <Box color="gray.500">{label}</Box>
                            <Box>{value}</Box>
                        </HStack>
                    );
                })}
            </VStack>
        </PanelSection>
    );
};

export default RacePanelInfo;
