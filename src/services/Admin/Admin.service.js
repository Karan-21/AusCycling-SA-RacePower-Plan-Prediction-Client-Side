import { Axios } from "../Axios.service";
import { AuthService } from "../Auth/Auth.service";

const getWhitelist = async () => {
    const token = await AuthService.fetchUserToken();

    const res = await Axios.get("/admin/whitelist", {
        headers: { authorization: `Bearer ${token}` },
    });

    return res.data;
};

const addWhitelistUser = async whitelistUser => {
    const token = await AuthService.fetchUserToken();

    const res = await Axios.post("/admin/whitelist", whitelistUser, {
        headers: { authorization: `Bearer ${token}` },
    });

    return res.data;
};

const deleteWhitelistUser = async email => {
    const token = await AuthService.fetchUserToken();

    const res = await Axios.delete("/admin/whitelist", {
        headers: { authorization: `Bearer ${token}` },
        data: email,
    });

    return res.data;
};

const editWhitelistUser = async whitelistUserEdits => {
    const token = await AuthService.fetchUserToken();

    const res = await Axios.patch("/admin/whitelist", whitelistUserEdits, {
        headers: { authorization: `Bearer ${token}` },
    });

    return res.data;
};

export const AdminService = {
    getWhitelist,
    addWhitelistUser,
    deleteWhitelistUser,
    editWhitelistUser,
};
