import React, { useState, Fragment } from "react";
import { BikeService } from "../../../../services";

import AddBikeForm from "./AddBikeForm";
import EditBikeForm from "./EditBikeForm";
import { useForm } from "react-hook-form";
import { PanelContainer, PanelSection } from "../../../../components/Layouts";
import { Table } from "../../../../components/StructuredData";
import { Button, IconButton, Box, Tr, Td, HStack } from "@chakra-ui/react";
import { RiSearchLine, RiDeleteBinLine, RiPencilFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../../services/Firebase/Firebase.service";

const columns = [
    "Name",
    "Type",
    "Weight (kg)",
    "Components",
    "Rolling Resistance",
    "Mechanical Loss",
    "",
];

const BikePanel = ({ bikes, setBikes }) => {
    const [modalStates, setModalStates] = useState({ addModal: false, editModal: false });
    const [curSelectedBike, setCurSelectedBike] = useState(null);

    const form = useForm({
        defaultValues: {
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
        },
    });

    // Handles the modal render states.
    const handleSetModalState = (modalName, state) => {
        setModalStates(curStates => ({ ...curStates, [modalName]: state }));
    };

    // Fetches a bike by its ID.
    const fetchBikeById = async bikeId => {
        try {
            const res = await BikeService.getBikeById(bikeId);

            setCurSelectedBike(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // Delete a bike by its ID.
    const deleteBikeById = async bikeId => {
        try {
            await BikeService.deleteBikeById(bikeId);

            // instead of re-retrieving everything, just remove the bike state
            setBikes(curBikes => {
                delete curBikes[bikeId];
                return { ...curBikes };
            });
        } catch (err) {
            console.log(err);
        }
    };

    const navigate = useNavigate();
    const navigateBike = async bikeId => {
        navigate("/" + auth?.currentUser.uid + "/" + bikeId);
    };

    return (
        <PanelContainer>
            <PanelSection title="Bike Form">
                <Box px={6} py={8}>
                    <Button
                        colorScheme="blue"
                        onClick={() => handleSetModalState("addModal", true)}
                    >
                        Add Bike
                    </Button>
                </Box>
            </PanelSection>
            {/** Table of bike data. */}
            <PanelSection title="Bikes">
                <Table columns={columns}>
                    {Object?.keys(bikes)?.length > 0 ? (
                        <Fragment>
                            {Object?.keys(bikes)?.map(bikeId => (
                                <Tr key={bikeId}>
                                    <Td>{bikes[bikeId].bike_name}</Td>
                                    <Td>{bikes[bikeId].bike_type}</Td>
                                    <Td>{bikes[bikeId].bike_weight}</Td>
                                    <Td>{bikes[bikeId].bike_component} Range</Td>
                                    <Td>
                                        {bikes[bikeId].coefficient_rolling_resistance}
                                    </Td>
                                    <Td>{bikes[bikeId].mechanical_loss}</Td>
                                    <Td>
                                        <HStack
                                            w="100%"
                                            spacing={4}
                                            justifyContent="flex-end"
                                        >
                                            <IconButton
                                                id={`view-${bikeId}`}
                                                colorScheme="blue"
                                                variant="outline"
                                                icon={<RiSearchLine size="20px" />}
                                                onClick={() => navigateBike(bikeId)}
                                            />
                                            <IconButton
                                                id={`edit-${bikeId}`}
                                                colorScheme="purple"
                                                variant="outline"
                                                icon={<RiPencilFill size="20px" />}
                                                onClick={() => {
                                                    fetchBikeById(bikeId);
                                                    handleSetModalState(
                                                        "editModal",
                                                        true
                                                    );
                                                }}
                                            />
                                            <IconButton
                                                id={`delete-${bikeId}`}
                                                colorScheme="red"
                                                icon={<RiDeleteBinLine size="20px" />}
                                                onClick={() => deleteBikeById(bikeId)}
                                            />
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))}
                        </Fragment>
                    ) : (
                        <Tr>
                            <Td colSpan={7}>No bikes available.</Td>
                        </Tr>
                    )}
                </Table>
            </PanelSection>
            {/** Add Bike Form Modal */}
            <AddBikeForm
                form={form}
                modalStates={modalStates}
                handleSetModalState={handleSetModalState}
                setBikes={setBikes}
            />
            {/** Edit Bike Form Modal */}
            <EditBikeForm
                form={form}
                modalStates={modalStates}
                handleSetModalState={handleSetModalState}
                setBikes={setBikes}
                curSelectedBike={curSelectedBike}
            />
        </PanelContainer>
    );
};

export default BikePanel;
