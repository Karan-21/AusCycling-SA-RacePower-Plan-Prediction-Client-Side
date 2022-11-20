import { Axios } from "../Axios.service";
import { AuthService } from "../Auth/Auth.service";

const createUserProfile = async (
    userId,
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
) => {
    const token = await AuthService.fetchUserToken();
    const body = {
        userId,
        firstName,
        lastName,
        dateOfBirth,
        experience,
        trainingElevation,
        height,
        weight,
        gender,
        functionalThresholdPower,
        maxHeartRate,
    };

    const res = await Axios.post("/user", body, {
        headers: { authorization: `Bearer ${token}` },
    });

    return res.data;
};

const getUserById = async userId => {
    const token = await AuthService.fetchUserToken();

    const res = await Axios.get(`/user/${userId}`, {
        headers: { authorization: `Bearer ${token}` },
    });

    return res.data;
};

const getRoles = async () => {
    const token = await AuthService.fetchUserToken();

    const res = await Axios.get("/user/roles", {
        headers: { authorization: `Bearer ${token}` },
    });

    console.log(res);

    return res.data;
};

export const UserService = {
    createUserProfile,
    getUserById,
    getRoles,
};
