import React, { useEffect, useCallback } from "react";
import { UserService } from "../../../../services/User/User.service";
import { auth } from "../../../../services/Firebase/Firebase.service";
import calculateAge from "../../../../utils/calculateAge";

import { PanelContainer, PanelSection } from "../../../../components/Layouts";
import {
    FirstNameField,
    LastNameField,
    BirthDateField,
    ExperienceField,
    TrainElevField,
    HeightField,
    WeightField,
    GenderField,
} from "./FormFields";
import { VStack, HStack, Box, Button, useToast } from "@chakra-ui/react";

const ProfilePanelForm = ({ form }) => {
    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = form;

    const toast = useToast();

    // Fetches the users details if they have an existing profile.
    const fetchUserProfile = useCallback(async () => {
        await UserService.getUserById(auth?.currentUser.uid).then(res => {
            if (res) {
                reset({
                    firstName: res.first_name,
                    lastName: res.last_name,
                    dateOfBirth: new Date(res.date_of_birth),
                    experience: res.experience,
                    trainingElevation: res.training_elev,
                    height: res.height,
                    weight: res.weight,
                    gender: res.gender,
                    functionalThresholdPower: res.functional_threshold_power,
                    maxHeartRate: res.max_heart_rate,
                });
            }
        });
    }, [reset]);

    // Calculates the user's FTP value.
    // https://joefrieltraining.com/estimating-your-ftp/
    const calculateFTP = (weight, age, gender) => {
        // Double the users weight value.
        let resultFTP = weight * 2;
        let valueToSubtract = 0;

        // Subtract 0.5% for every year beyond age 35.
        if (age > 35) {
            let numYearsOver = age - 35;

            valueToSubtract = resultFTP * ((numYearsOver * 0.5) / 100);
            resultFTP = resultFTP - valueToSubtract;
        }

        // If the user is female, subtract 10% from their estimated FTP.
        if (gender === "Female") {
            valueToSubtract = resultFTP * 0.1;
            resultFTP = resultFTP - valueToSubtract;
        }

        return Math.round(resultFTP);
    };

    // Function for submitting form data to the backend.
    const onSubmit = async values => {
        const {
            firstName,
            lastName,
            dateOfBirth,
            experience,
            trainingElevation,
            height,
            weight,
            gender,
        } = values;

        // If the user has entered a custom gender value,
        // the value in state will be overriden with the custom value.
        const functionalThresholdPower = calculateFTP(
            weight,
            calculateAge(dateOfBirth),
            gender
        );
        const maxHeartRate = 220 - calculateAge(dateOfBirth);

        try {
            const res = await UserService.createUserProfile(
                auth?.currentUser.uid,
                firstName,
                lastName,
                dateOfBirth,
                experience,
                trainingElevation,
                height,
                weight,
                gender,
                functionalThresholdPower,
                maxHeartRate
            );
            await new Promise(res => setTimeout(res, 250));

            toast({
                position: "bottom-left",
                description: res,
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
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);

    return (
        <PanelContainer>
            <PanelSection title="Athlete Information">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box p={6}>
                        <VStack spacing={6} alignItems="flex-start">
                            {/** First Row */}
                            <HStack w="100%" spacing={6} alignItems="flex-start">
                                <FirstNameField register={register} errors={errors} />
                                <LastNameField register={register} errors={errors} />
                            </HStack>

                            {/** Second Row */}
                            <HStack w="100%" spacing={6} alignItems="flex-start">
                                <BirthDateField control={control} errors={errors} />
                                <ExperienceField register={register} errors={errors} />
                            </HStack>

                            {/** Third Row */}
                            <HStack w="100%" spacing={6} alignItems="flex-start">
                                <TrainElevField register={register} errors={errors} />
                                <HeightField register={register} errors={errors} />
                            </HStack>

                            {/** Fourth Row */}
                            <HStack w="100%" spacing={6} alignItems="flex-start">
                                <WeightField register={register} errors={errors} />
                                <GenderField register={register} errors={errors} />
                            </HStack>
                        </VStack>

                        {/** Submit/Update Button */}
                        <Button
                            mt={10}
                            colorScheme="blue"
                            isLoading={isSubmitting}
                            type="submit"
                        >
                            Update Profile
                        </Button>
                    </Box>
                </form>
            </PanelSection>
        </PanelContainer>
    );
};

export default ProfilePanelForm;
