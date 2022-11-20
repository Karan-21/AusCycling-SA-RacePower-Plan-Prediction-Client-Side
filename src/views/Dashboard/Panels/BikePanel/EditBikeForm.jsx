import React, { useCallback } from "react";
import { BikeService } from "../../../../services";

import { PanelSection, Modal } from "../../../../components/Layouts";
import {
    BikeWeightField,
    BikeNameField,
    ComponentField,
    BikeTypeField,
    FrontWheelTypeField,
    FrontWheelWidthField,
    RearWheelWidthField,
    RearWheelTypeField,
    TireTypeField,
    TubeTypeField,
    HelmetTypeField,
    ClimbingPositionField,
    RacingPositionField,
    RollingResistanceField,
    MechanicalLossField,
} from "./FormFields";
import { VStack, HStack, Box, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect } from "react";

const EditBikeForm = ({
    form,
    modalStates,
    handleSetModalState,
    setBikes,
    curSelectedBike,
}) => {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = form;
    const { onClose } = useDisclosure();

    const toast = useToast();

    // Reset form data to the data that will be edited in this modal.
    const fetchBikeFormData = useCallback(() => {
        if (curSelectedBike) {
            reset({
                bikeName: curSelectedBike.bike.bike_name,
                bikeType: curSelectedBike.bike.bike_type,
                bikeWeight: curSelectedBike.bike.bike_weight,
                bikeComponent: curSelectedBike.bike.bike_component,
                frontWheelType: curSelectedBike.bike.front_wheel_type,
                frontWheelWidthType: curSelectedBike.bike.front_wheel_width,
                rearWheelType: curSelectedBike.bike.rear_wheel_type,
                rearWheelWidthType: curSelectedBike.bike.rear_wheel_width,
                tireType: curSelectedBike.bike.tire_type,
                tubeType: curSelectedBike.bike.tube_type,
                racingPosition: curSelectedBike.bike.racing_pos,
                climbingPosition: curSelectedBike.bike.climbing_pos,
                helmetType: curSelectedBike.bike.helmet_type,
                rollingResistance: curSelectedBike.bike.coefficient_rolling_resistance,
                mechanicalLoss: curSelectedBike.bike.mechanical_loss,
            });
        }
    }, [curSelectedBike, reset]);

    // Function for submitting form data to the backend.
    const onSubmit = async values => {
        const {
            bikeName,
            bikeType,
            bikeWeight,
            bikeComponent,
            frontWheelType,
            frontWheelWidthType,
            rearWheelType,
            rearWheelWidthType,
            tireType,
            tubeType,
            racingPosition,
            climbingPosition,
            helmetType,
            rollingResistance,
            mechanicalLoss,
        } = values;

        try {
            const res = await BikeService.editBike(
                curSelectedBike?.id,
                bikeName,
                bikeType,
                bikeWeight,
                bikeComponent,
                frontWheelType,
                frontWheelWidthType,
                rearWheelType,
                rearWheelWidthType,
                tireType,
                tubeType,
                racingPosition,
                climbingPosition,
                helmetType,
                rollingResistance,
                mechanicalLoss
            );
            await new Promise(res => setTimeout(res, 250));

            console.log(res.data);

            setBikes(curBikes => ({ ...curBikes, [res.data.id]: res.data.bike }));

            toast({
                position: "bottom-left",
                description: res.message,
                status: "success",
                duration: 5000,
                isClosable: true,
                containerStyle: {
                    pb: 6,
                    pl: 6,
                    m: 0,
                },
            });
        } catch (err) {
            const { data } = err.response;

            // Notifies the user of an unsuccessful request.
            toast({
                position: "bottom-left",
                description: `${data}`,
                status: "error",
                duration: 5000,
                isClosable: true,
                containerStyle: {
                    pb: 6,
                    pl: 6,
                    m: 0,
                },
            });
        } finally {
            handleModalClose();
        }
    };

    const handleModalClose = () => {
        reset({
            bikeName: "",
            bikeType: "",
            bikeWeight: 0,
            bikeComponent: "",
            frontWheelType: "",
            frontWheelWidthType: "",
            rearWheelType: "",
            rearWheelWidthType: "",
            tireType: "",
            tubeType: "",
            racingPosition: "",
            climbingPosition: "",
            helmetType: "",
            rollingResistance: 0,
            mechanicalLoss: 0,
        });
        onClose();
        handleSetModalState("editModal", false);
    };

    useEffect(() => {
        fetchBikeFormData();
    }, [fetchBikeFormData]);

    return (
        <Modal
            title="Edit Bike"
            isOpen={modalStates["editModal"]}
            onClose={handleModalClose}
            onSuccessText="Edit Bike"
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            size="6xl"
        >
            <VStack w="100%" spacing={6}>
                {/** Bike Data */}
                <PanelSection title="Bike Data">
                    <Box p={6}>
                        <VStack spacing={6} alignItems="flex-start">
                            {/** First Row */}
                            <HStack w="100%" spacing={6} alignItems="flex-start">
                                <BikeNameField register={register} errors={errors} />
                                <BikeTypeField register={register} errors={errors} />
                            </HStack>
                            {/** Second Row */}
                            <HStack w="100%" spacing={6} alignItems="flex-start">
                                <BikeWeightField register={register} errors={errors} />
                                <ComponentField register={register} errors={errors} />
                            </HStack>
                        </VStack>
                    </Box>
                </PanelSection>

                {/** Wheel & Tire Data */}
                <PanelSection title="Wheel & Tire Data">
                    <Box p={6}>
                        <VStack spacing={6} alignItems="flex-start">
                            {/** Third Row */}
                            <HStack w="100%" spacing={6} alignItems="flex-start">
                                <FrontWheelTypeField
                                    register={register}
                                    errors={errors}
                                />
                                <FrontWheelWidthField
                                    register={register}
                                    errors={errors}
                                />
                            </HStack>
                            {/** Fourth Row */}
                            <HStack w="100%" spacing={6} alignItems="flex-start">
                                <RearWheelTypeField register={register} errors={errors} />
                                <RearWheelWidthField
                                    register={register}
                                    errors={errors}
                                />
                            </HStack>
                            {/** Fifth Row */}
                            <HStack w="100%" spacing={6} alignItems="flex-start">
                                <TireTypeField register={register} errors={errors} />
                                <TubeTypeField register={register} errors={errors} />
                            </HStack>
                        </VStack>
                    </Box>
                </PanelSection>

                {/** Riding Style */}
                <PanelSection title="Riding Style">
                    <Box p={6}>
                        <VStack spacing={6} alignItems="flex-start">
                            {/** Sixth Row */}
                            <HStack w="100%" spacing={6} alignItems="flex-start">
                                <RacingPositionField
                                    register={register}
                                    errors={errors}
                                />
                                <ClimbingPositionField
                                    register={register}
                                    errors={errors}
                                />
                            </HStack>
                            {/** Seventh Row */}
                            <HStack w="100%" spacing={6} alignItems="flex-start">
                                <HelmetTypeField register={register} errors={errors} />
                            </HStack>
                        </VStack>
                    </Box>
                </PanelSection>

                {/** Rolling Resistance & Mechanical Loss */}
                <PanelSection title="Other Values">
                    <Box p={6}>
                        <VStack spacing={6} alignItems="flex-start">
                            {/** Eighth Row */}
                            <HStack w="100%" spacing={6} alignItems="flex-start">
                                <RollingResistanceField
                                    register={register}
                                    errors={errors}
                                />
                                <MechanicalLossField
                                    register={register}
                                    errors={errors}
                                />
                            </HStack>
                        </VStack>
                    </Box>
                </PanelSection>
            </VStack>
        </Modal>
    );
};

export default EditBikeForm;
