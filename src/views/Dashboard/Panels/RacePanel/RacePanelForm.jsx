import React from "react";

import { PanelSection } from "../../../../components/Layouts";
import {
    BikeField,
    CourseField,
    DistanceField,
    HumidityField,
    RaceNameField,
    RaceTimeField,
    RaceTypeField,
    RoadConditionField,
    TemperatureField,
    TerrainField,
    WindDirectionField,
    WindSpeedField,
} from "./FormFields";
import { VStack, HStack, Box, Button, useToast } from "@chakra-ui/react";

const RacePanelForm = ({ form }) => {
    const {
        handleSubmit,
        register,
        control,
        formState: { errors, isSubmitting },
    } = form;

    const toast = useToast();

    // Function for submitting form data to the backend.
    const onSubmit = values => {
        return new Promise(resolve => {
            setTimeout(() => {
                toast({
                    position: "bottom-left",
                    description: "Race Created.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    containerStyle: {
                        pb: 6,
                        pl: 6,
                        m: 0,
                    },
                });
                resolve();
            }, 1000);
        });
    };

    return (
        <PanelSection title="Race Information">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box p={6}>
                    <VStack spacing={6} alignItems="flex-start">
                        {/** First Row */}
                        <HStack w="100%" spacing={6} alignItems="flex-start">
                            <BikeField register={register} errors={errors} />
                            <CourseField register={register} errors={errors} />
                        </HStack>

                        {/** Second Row */}
                        <HStack w="100%" spacing={6} alignItems="flex-start">
                            <DistanceField register={register} errors={errors} />
                            <HumidityField register={register} errors={errors} />
                        </HStack>

                        {/** Third Row */}
                        <HStack w="100%" spacing={6} alignItems="flex-start">
                            <RaceNameField
                                register={register}
                                errors={errors}
                                // selectedUnits={selectedUnits}
                            />
                            <RaceTimeField
                                control={control}
                                errors={errors}
                                // unitConversion={unitConversion}
                            />
                        </HStack>

                        {/** Fourth Row */}
                        <HStack w="100%" spacing={6} alignItems="flex-start">
                            <RaceTypeField
                                register={register}
                                errors={errors}
                                // selectedUnits={selectedUnits}
                            />
                            <RoadConditionField
                                register={register}
                                errors={errors}
                                // selectedUnits={selectedUnits}
                            />
                        </HStack>

                        {/** Fifth Row */}
                        <HStack w="100%" spacing={6} alignItems="left">
                            <WindDirectionField register={register} errors={errors} />
                            <WindSpeedField register={register} errors={errors} />
                        </HStack>

                        {/** Sixth Row */}
                        <HStack w="100%" spacing={6} alignItems="left">
                            <TemperatureField register={register} errors={errors} />
                            <TerrainField register={register} errors={errors} />
                        </HStack>
                    </VStack>

                    {/** Submit/Update Button */}
                    <Button
                        mt={10}
                        colorScheme="blue"
                        isLoading={isSubmitting}
                        type="submit"
                    >
                        Update Race
                    </Button>
                </Box>
            </form>
        </PanelSection>
    );
};

export default RacePanelForm;
