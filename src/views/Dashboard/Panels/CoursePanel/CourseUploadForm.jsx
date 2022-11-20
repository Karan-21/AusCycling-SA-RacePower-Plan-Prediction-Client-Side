import React, { useState, useEffect } from "react";
import { CourseService } from "../../../../services";
import { auth } from "../../../../services/Firebase/Firebase.service";
import uuid from "react-uuid";

import CourseMap from "./CourseMap";
import CourseSegmentForm from "./CourseSegmentForm";
import CourseElevationChart from "./CourseElevationChart";
import { CourseNameField, CoursePublicField } from "./FormFields";
import { Modal, PanelSection } from "../../../../components/Layouts";
import { Table } from "../../../../components/StructuredData";
import { useForm } from "react-hook-form";
import { VStack, HStack, useToast, IconButton, Tr, Td, Box } from "@chakra-ui/react";
import { RiDeleteBinLine } from "react-icons/ri";

const columns = ["Segment Start (km)", "Segment End (km)", "Terrain", ""];

const CourseUploadForm = ({
    isOpen,
    onClose,
    courseData,
    setCurProcessedGPX,
    setCurrentFile,
}) => {
    const [terrainTypes, setTerrainTypes] = useState([]);
    const [curMousePos, setCurMousePos] = useState(0);
    const [segments, setSegments] = useState([]);
    const [segmentInput, setSegmentInput] = useState({
        segmentStart: "",
        segmentEnd: "",
        terrain: "Open",
    });
    const {
        handleSubmit,
        register,
        control,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            courseName: "",
            coursePublic: "",
        },
    });
    const courseCumDistKm = courseData?.cumdist.map(val => val / 1000);

    const toast = useToast();

    // Clears input fields and local state storage when the user closes the Modal.
    const handleModalClose = () => {
        onClose();
        setSegments([]);
        setSegmentInput({
            segmentStart: "",
            segmentEnd: "",
            terrain: 0,
        });
    };

    // Handles the deletion of a track segment.
    const onSegmentRemove = id => {
        const { segmentStartIndex: startIndex, segmentEndIndex: endIndex } =
            segments.filter(segment => segment.id === id)[0];

        // Reset course data segment and terrain properites.
        const newCourseSegments = courseData?.segment;
        const newCourseTerrains = courseData?.terrain;
        for (let i = startIndex; i < endIndex; ++i) {
            newCourseSegments[i] = 0;
            newCourseTerrains[i] = 0;
        }

        setCurProcessedGPX({
            ...courseData,
            segment: newCourseSegments,
            terrain: newCourseTerrains,
        });

        setSegments(curr => curr.filter(segment => segment.id !== id));
    };

    // Handles the addition of a new track segment to React state.
    const onSegmentAdd = async () => {
        const { terrain } = segmentInput;
        const segmentStart = Math.floor(segmentInput.segmentStart);
        const segmentEnd = Math.floor(segmentInput.segmentEnd);
        const courseDist = courseData?.cumdist.at(-1) / 1000;

        if (segmentEnd > courseDist) {
            // If the segment end value is greater than the length of the course,
            // an error is returned.
            toast({
                position: "bottom-left",
                description: `This Segment Is Too Large. It Must Be Less Than ${courseDist.toFixed(
                    2
                )} km.`,
                status: "error",
                duration: 5000,
                isClosable: true,
                containerStyle: {
                    pb: 6,
                    pl: 6,
                    m: 0,
                },
            });

            return;
        } else {
            // Otherwise, we can insert the segment into local react state,
            // and modify the course data.

            // Finds the segments starting and endings KM index.
            const startIndex = courseCumDistKm.findIndex(
                val => parseInt(segmentStart) === Math.floor(val)
            );
            const endIndex = courseCumDistKm.findIndex(
                val => parseInt(segmentEnd) === Math.floor(val)
            );

            setSegments(current => [
                ...current,
                {
                    id: uuid(),
                    segmentStart: segmentStart,
                    segmentStartIndex: startIndex,
                    segmentEnd: segmentEnd,
                    segmentEndIndex: endIndex,
                    terrain: terrain,
                },
            ]);

            // Modifies the courseData's segment and terrain properties accordingly.
            const newCourseSegments = courseData?.segment;
            const newCourseTerrains = courseData?.terrain;
            for (let i = startIndex; i < endIndex; ++i) {
                newCourseSegments[i] = segments.length + 1;
                newCourseTerrains[i] = terrain;
            }

            setCurProcessedGPX({
                ...courseData,
                segment: newCourseSegments,
                terrain: newCourseTerrains,
            });

            // Resets the user input fields for the next segment.
            setSegmentInput({
                segmentStart: "",
                segmentEnd: "",
                terrain: 0,
            });
        }
    };

    // Fetches the list of available roles from the DB and
    // stores it in local react state.
    const fetchTerrainTypes = async () => {
        try {
            const res = await CourseService.getTerrainTypes();
            await new Promise(res => setTimeout(res, 250));

            setTerrainTypes(res);
        } catch (err) {
            console.log(err);
        }
    };

    // Once a GPX file has been successfully processed, and information edited,
    // it will be sent to the DB.
    const onSubmit = async values => {
        const { courseName, coursePublic } = values;
        try {
            const res = await CourseService.addCourse(
                auth?.currentUser.uid,
                courseName,
                coursePublic,
                JSON.stringify(courseData)
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
            reset({ courseName: "", coursePublic: "" });
            setCurrentFile(null);
            setCurProcessedGPX(null);
            setSegments([]);
            onClose();
        }
    };

    useEffect(() => {
        fetchTerrainTypes();
    }, []);

    return (
        <Modal
            title="Confirm Upload"
            isOpen={isOpen}
            onClose={handleModalClose}
            onSuccessText="Upload"
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            size="6xl"
        >
            <VStack w="full" spacing={6} alignItems="flex-start">
                <HStack w="100%" spacing={8} alignItems="flex-start">
                    {/** Course Name Input Field */}
                    <CourseNameField register={register} errors={errors} />
                    {/** Course Visibility Input Field */}
                    <CoursePublicField
                        control={control}
                        errors={errors}
                        setValue={setValue}
                    />
                </HStack>
                {/** Course Map */}
                <CourseMap
                    courseData={courseData}
                    segments={segments}
                    curMousePos={curMousePos}
                />
                {/** Segments Table */}
                <Table w="100%" columns={columns} borderWidth="1px" rounded="md">
                    {/** The Segment Start Values are Sorted */}
                    {segments.length > 0 ? (
                        segments
                            .sort((a, b) => a.segmentStart - b.segmentStart)
                            .map(({ id, segmentStart, segmentEnd, terrain }) => (
                                <Tr key={id} id={id}>
                                    <Td>{segmentStart}</Td>
                                    <Td>{segmentEnd}</Td>
                                    <Td>{terrainTypes[terrain]}</Td>
                                    <Td>
                                        <HStack
                                            w="100%"
                                            spacing={4}
                                            justifyContent="flex-end"
                                        >
                                            <IconButton
                                                id={`delete-${id}`}
                                                colorScheme="red"
                                                onClick={() => onSegmentRemove(id)}
                                                icon={<RiDeleteBinLine size="20px" />}
                                            />
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))
                    ) : (
                        <Tr>
                            <Td colSpan={4}>No segments added.</Td>
                        </Tr>
                    )}
                </Table>
                {/** Course Segment Form - Handles the Addition of New Segments */}
                <CourseSegmentForm
                    terrainTypes={terrainTypes}
                    segmentInput={segmentInput}
                    setSegmentInput={setSegmentInput}
                    onSegmentAdd={onSegmentAdd}
                />
                <PanelSection
                    title={`Elevation Profile (${(
                        courseData?.cumdist.at(-1) / 1000
                    ).toFixed(2)} km)`}
                >
                    <Box px={4} pt={6}>
                        <CourseElevationChart
                            courseCumDistKm={courseCumDistKm}
                            courseElev={courseData?.elev}
                            setCurMousePos={setCurMousePos}
                        />
                    </Box>
                </PanelSection>
            </VStack>
        </Modal>
    );
};

export default CourseUploadForm;
