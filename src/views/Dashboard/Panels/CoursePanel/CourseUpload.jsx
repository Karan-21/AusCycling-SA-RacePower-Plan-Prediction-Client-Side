import React, { useState } from "react";
import { CourseService } from "../../../../services";

import CourseUploadForm from "./CourseUploadForm";
import { PanelSection } from "../../../../components/Layouts";
import { FileUpload } from "../../../../components/Forms";
import {
    VStack,
    HStack,
    Box,
    Flex,
    Spinner,
    IconButton,
    useToast,
    useDisclosure,
} from "@chakra-ui/react";
import { BsArrowUp } from "react-icons/bs";

const CourseUpload = () => {
    const [currentFile, setCurrentFile] = useState(null);
    const [curProcessedGPX, setCurProcessedGPX] = useState(null);
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

    // When a file is selected for upload, it's extension is checked so
    // to ensure that only GPX files are processed.
    const importFile = file => {
        const fileName = file[0].name;

        if (fileName.substr(fileName.length - 4) !== ".gpx") {
            // Notifies the user of a failed upload.
            toast({
                position: "bottom-left",
                description: "You must upload a GPX file.",
                status: "error",
                duration: 3000,
                isClosable: true,
                containerStyle: {
                    pb: 6,
                    pl: 6,
                    m: 0,
                },
            });
        } else {
            setCurrentFile(file[0]);
        }
    };

    // Sends the uploaded GPX course file to the express server, where it is
    // processed for information, and the data is sent back.
    const handleUpload = async e => {
        const { id } = e.currentTarget;

        // If the file exists, handle the request.
        if (currentFile) {
            const formData = new FormData();
            formData.append("image", currentFile, currentFile.name);

            handleSetButtonState(id, true);
            try {
                const res = await CourseService.uploadCourse(formData);

                // Prepares the confirm modal with necessary information.
                setCurProcessedGPX(res.data);
                onOpen();
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
                handleSetButtonState(id, false);
            }
        }
    };

    return (
        <PanelSection title="Upload Course">
            {/** Confirmation Modal */}
            <CourseUploadForm
                isOpen={isOpen}
                onClose={onClose}
                courseData={curProcessedGPX}
                setCurProcessedGPX={setCurProcessedGPX}
                setCurrentFile={setCurrentFile}
            />
            {/** GPX File Drop Zone */}
            <Box p={6}>
                <VStack spacing={6} alignItems="flex-start">
                    <FileUpload onFileAccepted={importFile} />
                    <HStack gap={2}>
                        {/** File Upload Button and Name Confirmation */}
                        <IconButton
                            id="submit"
                            colorScheme="blue"
                            onClick={handleUpload}
                            icon={
                                buttonStates["submit"] ? (
                                    <Spinner />
                                ) : (
                                    <BsArrowUp size={26} />
                                )
                            }
                        />
                        <Box bg="gray.200" rounded="md">
                            <Flex h="40px" px="16px" alignItems="center">
                                {currentFile ? currentFile.name : "None Selected"}
                            </Flex>
                        </Box>
                    </HStack>
                </VStack>
            </Box>
        </PanelSection>
    );
};

export default CourseUpload;
