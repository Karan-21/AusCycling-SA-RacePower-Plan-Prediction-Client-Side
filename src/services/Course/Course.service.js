import { Axios } from "../Axios.service";
import { AuthService } from "../Auth/Auth.service";

const getCourses = async () => {
    const token = await AuthService.fetchUserToken();

    const res = await Axios.get("/courses", {
        headers: { authorization: `Bearer ${token}` },
    });

    return res.data;
};

const addCourse = async (userId, courseName, courseVisibility, courseData) => {
    const token = await AuthService.fetchUserToken();

    const res = await Axios.post(
        "/course",
        { userId, courseName, courseVisibility, courseData },
        {
            headers: { authorization: `Bearer ${token}` },
        }
    );

    return res.data;
};

const uploadCourse = async formData => {
    const token = await AuthService.fetchUserToken();

    const res = await Axios.post("/uploadCourse", formData, {
        headers: { authorization: `Bearer ${token}` },
    });

    return res;
};

const getTerrainTypes = async () => {
    const token = await AuthService.fetchUserToken();

    const res = await Axios.get("/course/terrain", {
        headers: { authorization: `Bearer ${token}` },
    });

    return res.data;
};

export const CourseService = {
    getCourses,
    uploadCourse,
    addCourse,
    getTerrainTypes,
};
