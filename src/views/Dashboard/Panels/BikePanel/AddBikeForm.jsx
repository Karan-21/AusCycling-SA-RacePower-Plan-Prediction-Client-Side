import React from "react";
import { BikeService } from "../../../../services";
import { auth } from "../../../../services/Firebase/Firebase.service";

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

const AddBikeForm = ({ form, modalStates, handleSetModalState, setBikes }) => {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = form;
    const { onClose } = useDisclosure();

    const toast = useToast();

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
            const res = await BikeService.addBike(
                auth?.currentUser.uid,
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
        });
        onClose();
        handleSetModalState("addModal", false);
    };

    return (
        <Modal
            title="Add Bike"
            isOpen={modalStates["addModal"]}
            onClose={handleModalClose}
            onSuccessText="Add Bike"
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

export default AddBikeForm;
