import React from "react";
import ReactDatePicker from "react-datepicker";

import { useColorMode } from "@chakra-ui/react";

import "react-datepicker/dist/react-datepicker.css";
import "./date-picker.css";

const DatePicker = ({
    selectedDate,
    onChange,
    isClearable = false,
    showPopperArrow = false,
    ...rest
}) => {
    const isLight = useColorMode().colorMode === "light";

    return (
        <div className={`${isLight ? "light-theme" : "dark-theme"} error`}>
            <ReactDatePicker
                selected={selectedDate}
                onChange={onChange}
                isClearable={isClearable}
                showPopperArrow={showPopperArrow}
                className="react-datapicker__input-text"
                {...rest}
            />
        </div>
    );
};

export default DatePicker;
