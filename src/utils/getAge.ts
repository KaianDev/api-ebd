export const getAge = (date: Date) => {
    const currentYear = new Date().getFullYear();
    const birthYear = date.getFullYear();
    return currentYear - birthYear;
};
