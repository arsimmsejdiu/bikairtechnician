export const renderDateLastReportReview = (dates: any, text: string) => {
    if (dates) {
        const date = new Date(dates).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });
        const time = new Date(dates).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit"
        });
        return `${date} ${time}`;
    } else {
        return text;
    }
};
