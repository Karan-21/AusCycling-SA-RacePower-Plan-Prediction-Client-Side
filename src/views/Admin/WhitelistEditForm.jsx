import React, { useMemo, useEffect } from "react";
import { AdminService } from "../../services";

import { Modal } from "../../components/Layouts";
import { useForm } from "react-hook-form";
import { EmailField, RoleField } from "./FormFields";
import { HStack, useToast } from "@chakra-ui/react";

const WhitelistEditForm = ({
    userDetails,
    roles,
    whitelist,
    setWhitelist,
    isOpen,
    onClose,
}) => {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: useMemo(() => {
            return userDetails;
        }, [userDetails]),
    });

    const toast = useToast();

    // Handles editing a users details in the DB whitelist collection.
    const onSubmit = async data => {
        const { email, role } = data;
        const { email: oldEmail, role: oldRole } = userDetails;

        if (email === oldEmail && role === oldRole) {
            toast({
                position: "bottom-left",
                description: `No Edits Were Made to the Whitelist User.`,
                status: "warning",
                duration: 5000,
                isClosable: true,
                containerStyle: {
                    pb: 6,
                    pl: 6,
                    m: 0,
                },
            });
            onClose();

            return;
        }

        try {
            const res = await AdminService.editWhitelistUser({ oldEmail, email, role });
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
            if (email !== oldEmail) {
                setWhitelist(({ [oldEmail]: toDelete, ...rest }) => rest);
            }
        } catch (err) {
            console.log(err);
        } finally {
            onClose();
        }
    };

    // Resets the defaultValues in useForm to details of the
    // user currently being edited.
    useEffect(() => {
        reset(userDetails);
    }, [reset, userDetails]);

    return (
        <Modal
            title="Edit Whitelist User"
            overlayClick={true}
            isOpen={isOpen}
            onClose={onClose}
            isLoading={isSubmitting}
            onSuccessText="Edit User"
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
        >
            <HStack spacing={5} alignItems="flex-start">
                <EmailField register={register} errors={errors} />
                <RoleField roles={roles} register={register} errors={errors} />
            </HStack>
        </Modal>
    );
};

export default WhitelistEditForm;
