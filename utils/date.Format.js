// export a function that takes a date object and returns a string in the format of MM/DD/YYYY
module.exports = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};