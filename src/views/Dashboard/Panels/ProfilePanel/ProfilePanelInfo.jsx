import React from "react";

import { PanelSection } from "../../../../components/Layouts";
import { VStack, HStack, Box } from "@chakra-ui/react";

const rowData = [
    { label: "First Name", accessor: "firstName" },
    { label: "Last Name", accessor: "lastName" },
    { label: "Date of Birth", accessor: "dateOfBirth" },
    { label: "Experience", accessor: "experience" },
    { label: "Training Elevation", accessor: "trainingElevation" },
    { label: "Preferred Units", accessor: "preferredUnits" },
    { label: "Height", accessor: "height" },
    { label: "Weight", accessor: "weight" },
    { label: "Gender", accessor: "gender" },
];

const ProfilePanelInfo = ({ userInfo }) => {
    return (
        <PanelSection title="Athlete Information">
            <VStack p={6} spacing={6} alignItems="flex-start">
                {rowData.map(({ label, accessor }) => {
                    const value =
                        accessor === "dateOfBirth"
                            ? userInfo[accessor].toDateString()
                            : userInfo[accessor];

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

export default ProfilePanelInfo;
