import React from "react";

import ProfilePanelForm from "./ProfilePanelForm";
import { PanelContainer } from "../../../../components/Layouts";
import { useForm } from "react-hook-form";
import { HStack } from "@chakra-ui/react";

const ProfilePanel = () => {
    const form = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            dateOfBirth: new Date(),
            experience: "",
            trainingElevation: 0,
            preferredUnits: "Metric",
            height: 0,
            weight: 0,
            gender: "",
            functionalThresholdPower: 0,
            maxHeartRate: 0,
        },
    });

    return (
        <PanelContainer>
            <HStack w="100%" spacing={6} alignItems="flex-start">
                <ProfilePanelForm form={form} />
            </HStack>
        </PanelContainer>
    );
};

export default ProfilePanel;
