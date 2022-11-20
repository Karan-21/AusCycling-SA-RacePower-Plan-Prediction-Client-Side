// Calculates the users age from their date of birth.
const calculateAge = dateOfBirth => {
    let today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    let month = today.getMonth() - dateOfBirth.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < dateOfBirth.getDate())) {
        age = age - 1;
    }

    return age;
};

export default calculateAge;
