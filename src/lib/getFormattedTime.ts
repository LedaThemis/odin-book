const getFormattedTime = (timeString: string) => {
    return new Date(timeString).toLocaleString();
};

export default getFormattedTime;
