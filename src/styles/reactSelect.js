// SelectStyles.js
export const customSelectStyles = {
    control: (provided, state) => ({
        ...provided,
        height: 50,
        minHeight: 40,
        padding: "0 5px",
        borderColor: state.isFocused ? "#6a0dad" : "#ccc",
        boxShadow: state.isFocused ? "#6a0dad" : "none",
        borderRadius: 8,
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
            borderColor: "#6a0dad",
            boxShadow: "none",
        },
    }),
    menu: (provided) => ({
        ...provided,
        overflowY: "auto",
    }),
    placeholder: (provided) => ({
        ...provided,
        fontSize: 16,
    }),
    option: (provided) => ({
        ...provided,
        padding: "8px 12px",
    }),
};
