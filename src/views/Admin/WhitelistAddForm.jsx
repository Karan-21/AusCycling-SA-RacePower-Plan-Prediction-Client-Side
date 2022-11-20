import React from "react";
import { AdminService } from "../../services";

import { useForm } from "react-hook-form";
import { EmailField, RoleField } from "./FormFields";
import { HStack, Button, Flex, useToast } from "@chakra-ui/react";

const WhitelistAddForm = ({
    roles,
    whitelist,
    setWhitelist,
    isLoading,
    setIsLoading,
}) => {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            email: "",
            role: "user",
        },
    });

    const toast = useToast();

    // Handles adding a user to the DB whitelist collection.
    const onSubmit = async data => {
        const { email, role } = data;

        setIsLoading(true);
        try {
            const res = await AdminService.addWhitelistUser(data);
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

            setWhitelist({ ...whitelist, [email]: { role: role } });
        } catch (err) {
            console.log(err);
        } finally {
            reset({ email: "" });
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <HStack h="100%" spacing={5} alignItems="flex-start">
                <EmailField register={register} errors={errors} />
                <RoleField
                    roles={roles}
                    register={register}
                    errors={errors}
                    isLoading={isLoading}
                />
                <Flex maxH="100%" pt="35px">
                    <Button
                        w="auto"
                        m={0}
                        colorScheme="blue"
                        isLoading={isSubmitting}
                        alignSelf="flex-end"
                        type="submit"
                    >
                        Add User
                    </Button>
                </Flex>
            </HStack>
        </form>
    );
};

export default WhitelistAddForm;
