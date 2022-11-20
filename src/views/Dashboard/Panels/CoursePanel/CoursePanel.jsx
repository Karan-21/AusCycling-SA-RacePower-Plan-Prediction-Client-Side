import React, { Fragment } from "react";

import CourseUpload from "./CourseUpload";
import { PanelContainer, PanelSection } from "../../../../components/Layouts";
import { Table } from "../../../../components/StructuredData";
import { Alert, AlertIcon, Tr, Td } from "@chakra-ui/react";

const columns = ["Course", "Distance (km)", "City", "State", "Country"];

const CoursePanel = ({ courses }) => {
    return (
        <PanelContainer>
            {/** Alert if no courses exist */}
            {courses.length === 0 && (
                <Alert status="info" variant="subtle" rounded="xl">
                    <AlertIcon />
                    Upload a course or select a course from our database.
                </Alert>
            )}
            {/** Form to upload a course. */}
            <CourseUpload />
            {/** Table of course data. */}
            <PanelSection title="Courses">
                <Table columns={columns}>
                    {courses.length > 0 ? (
                        <Fragment>
                            {courses.map(course => (
                                <Tr key={course.courseId}>
                                    <Td>{course.course}</Td>
                                    <Td>{course.distance}</Td>
                                    <Td>{course.city}</Td>
                                    <Td>{course.state}</Td>
                                    <Td>{course.country}</Td>
                                </Tr>
                            ))}
                        </Fragment>
                    ) : (
                        <Tr>
                            <Td colSpan={5}>No courses available.</Td>
                        </Tr>
                    )}
                </Table>
            </PanelSection>
        </PanelContainer>
    );
};

export default CoursePanel;
