import React from "react";

import { useForm } from "react-hook-form";
import RacePanelForm from "./RacePanelForm";
import { PanelContainer } from "../../../../components/Layouts";
import { HStack } from "@chakra-ui/react";

const RacePanel = () => {
    const form = useForm({
        defaultValues: {
            bikeName: "",
            courseName: "",
            distance: "",
            humidity: 0,
            raceName: "",
            raceTime: new Date(),
            raceType: "",
            roadCondition: "",
            temperature: 0,
            terrain: "",
            windDirection: "",
            windSpeed: 0,
        },
    });

    return (
        <PanelContainer>
            <HStack w="100%" spacing={6} alignItems="flex-start">
                <RacePanelForm form={form} />
            </HStack>
        </PanelContainer>
    );
};

export default RacePanel;
