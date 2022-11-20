import { useParams } from "react-router-dom";

const BikeView = () => {
    let params = useParams();
    console.log(params.bikeId);
    return <h1>{params.bikeId}</h1>;
};

export default BikeView;
