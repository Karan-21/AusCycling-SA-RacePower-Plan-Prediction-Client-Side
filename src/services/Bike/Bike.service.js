import { Axios } from "../Axios.service";
import { AuthService } from "../Auth/Auth.service";

const addBike = async (
    userId,
    bikeName,
    bikeType,
    bikeWeight,
    bikeComponent,
    frontWheelType,
    frontWheelWidthType,
    rearWheelType,
    rearWheelWidthType,
    tireType,
    tubeType,
    racingPosition,
    climbingPosition,
    helmetType,
    rollingResistance,
    mechanicalLoss
) => {
    const token = await AuthService.fetchUserToken();
    const body = {
        userId,
        bikeName,
        bikeType,
        bikeWeight,
        bikeComponent,
        frontWheelType,
        frontWheelWidthType,
        rearWheelType,
        rearWheelWidthType,
        tireType,
        tubeType,
        racingPosition,
        climbingPosition,
        helmetType,
        rollingResistance,
        mechanicalLoss,
    };

    const res = await Axios.post("/bike", body, {
        headers: { authorization: `Bearer ${token}` },
    });

    return res.data;
};

const editBike = async (
    bikeId,
    bikeName,
    bikeType,
    bikeWeight,
    bikeComponent,
    frontWheelType,
    frontWheelWidthType,
    rearWheelType,
    rearWheelWidthType,
    tireType,
    tubeType,
    racingPosition,
    climbingPosition,
    helmetType,
    rollingResistance,
    mechanicalLoss
) => {
    const token = await AuthService.fetchUserToken();
    const body = {
        bikeId,
        bikeName,
        bikeType,
        bikeWeight,
        bikeComponent,
        frontWheelType,
        frontWheelWidthType,
        rearWheelType,
        rearWheelWidthType,
        tireType,
        tubeType,
        racingPosition,
        climbingPosition,
        helmetType,
        rollingResistance,
        mechanicalLoss,
    };

    const res = await Axios.post(`/bike/edit/${bikeId}`, body, {
        headers: { authorization: `Bearer ${token}` },
    });

    return res.data;
};

const getBikesForUser = async userId => {
    const token = await AuthService.fetchUserToken();

    const res = await Axios.get(`/bikes/${userId}`, {
        headers: { authorization: `Bearer ${token}` },
    });

    return res.data;
};

const getBikeById = async bikeId => {
    const token = await AuthService.fetchUserToken();

    const res = await Axios.get(`/bike/${bikeId}`, {
        headers: { authorization: `Bearer ${token}` },
    });

    return res.data;
};

const deleteBikeById = async bikeId => {
    const token = await AuthService.fetchUserToken();

    const res = await Axios.delete(`/bike/${bikeId}`, {
        headers: { authorization: `Bearer ${token}` },
    });

    return res.data;
};

export const BikeService = {
    addBike,
    editBike,
    getBikesForUser,
    getBikeById,
    deleteBikeById,
};
