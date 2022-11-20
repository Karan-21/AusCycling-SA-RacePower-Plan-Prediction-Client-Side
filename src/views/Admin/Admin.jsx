import React, { Fragment, useState, useEffect } from "react";
import { AdminService, UserService } from "../../services";

import WhitelistAddForm from "./WhitelistAddForm";
import WhitelistEditForm from "./WhitelistEditForm";
import { ViewContainer, PanelContainer, PanelSection } from "../../components/Layouts";
import { Table } from "../../components/StructuredData";
import {
    Tr,
    Td,
    Box,
    Flex,
    Spinner,
    IconButton,
    HStack,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { RiDeleteBinLine, RiPencilFill } from "react-icons/ri";

const columns = ["Email", "Role", ""];

const Admin = () => {
    const [whitelist, setWhitelist] = useState({});
    const [roles, setRoles] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [buttonStates, setButtonStates] = useState({});

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    // Each button has it's own state value, allowing us to set
    // individual buttons as LOADING.
    const handleSetButtonState = (id, state) => {
        setButtonStates({
            ...buttonStates,
            [id]: state,
        });
    };

    // Handles the deletion of a user from the DB whitelist collection.
    const handleDeleteWhitelistUser = async (e, email) => {
        const { id } = e.currentTarget;

        handleSetButtonState(id, true);
        try {
            const res = await AdminService.deleteWhitelistUser({ email });
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

            setWhitelist(({ [email]: toDelete, ...rest }) => rest);
        } catch (err) {
            console.log(err);
        } finally {
            handleSetButtonState(id, false);
        }
    };

    // Fetches the list of whitelisted users from the DB and
    // stores it in local react state.
    const fetchWhitelist = async () => {
        setIsLoading(true);
        try {
            const res = await AdminService.getWhitelist();
            await new Promise(res => setTimeout(res, 250));

            setWhitelist(res);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetches the list of available roles from the DB and
    // stores it in local react state.
    const fetchRoles = async () => {
        try {
            const res = await UserService.getRoles();
            await new Promise(res => setTimeout(res, 250));

            setRoles(res);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchWhitelist();
        fetchRoles();
    }, []);

    return (
        <ViewContainer>
            <PanelContainer>
                <PanelSection title="Whitelist Form">
                    <Box px={6} py={8}>
                        <WhitelistAddForm
                            roles={roles}
                            whitelist={whitelist}
                            setWhitelist={setWhitelist}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                        />
                        <WhitelistEditForm
                            userDetails={userDetails}
                            roles={roles}
                            whitelist={whitelist}
                            setWhitelist={setWhitelist}
                            isOpen={isOpen}
                            onClose={onClose}
                        />
                    </Box>
                </PanelSection>
                <PanelSection title="Whitelist">
                    {isLoading ? (
                        <Box w="100%" bg="gray.100">
                            <Flex h="113px" alignItems="center" justifyContent="center">
                                <Spinner />
                            </Flex>
                        </Box>
                    ) : (
                        <Fragment>
                            <Table columns={columns}>
                                {Object?.keys(whitelist)?.map(email => (
                                    <Tr key={email} id={email}>
                                        <Td w="25%">{email}</Td>
                                        <Td>
                                            {whitelist[email].role
                                                .charAt(0)
                                                .toUpperCase() +
                                                whitelist[email].role.slice(1)}
                                        </Td>
                                        <Td>
                                            <HStack
                                                w="100%"
                                                spacing={4}
                                                justifyContent="flex-end"
                                            >
                                                <IconButton
                                                    id={`edit-${email}`}
                                                    colorScheme="purple"
                                                    variant="outline"
                                                    icon={<RiPencilFill size="20px" />}
                                                    onClick={async () => {
                                                        await setUserDetails({
                                                            email: email,
                                                            role: whitelist[email].role,
                                                        });
                                                        onOpen();
                                                    }}
                                                />
                                                <IconButton
                                                    id={`delete-${email}`}
                                                    colorScheme="red"
                                                    onClick={e =>
                                                        handleDeleteWhitelistUser(
                                                            e,
                                                            email
                                                        )
                                                    }
                                                    icon={
                                                        buttonStates[
                                                            `delete-${email}`
                                                        ] ? (
                                                            <Spinner />
                                                        ) : (
                                                            <RiDeleteBinLine size="20px" />
                                                        )
                                                    }
                                                />
                                            </HStack>
                                        </Td>
                                    </Tr>
                                ))}
                            </Table>
                        </Fragment>
                    )}
                </PanelSection>
            </PanelContainer>
        </ViewContainer>
    );
};

export default Admin;
