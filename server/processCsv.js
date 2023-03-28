import { parse } from "date-fns";

const parseDate = (dateString) => {
    const formats = [
        "yyyy-MM-dd",
        "yyyy/MM/dd",
        "dd-MM-yyyy",
        "dd/MM/yyyy",
        "MM-dd-yyyy",
        "MM/dd/yyyy",
    ];

    for (const format of formats) {
        const date = parse(dateString, format, new Date());
        if (!isNaN(date)) {
            return date;
        }
    }

    throw new Error(`Unable to parse date: ${dateString}`);
};

const processCsv = (data) => {
    const lines = data.trim().split(/\r?\n/);

    const parsedData = lines.map((line) => {
        const [EmpID, ProjectID, DateFrom, DateTo] = line.split(", ");
        return { EmpID, ProjectID, DateFrom, DateTo };
    });
    const collaborations = new Map();

    parsedData.forEach((row1) => {
        parsedData.forEach((row2) => {
            if (
                row1.EmpID !== row2.EmpID &&
                row1.ProjectID === row2.ProjectID
            ) {
                const key = `${Math.min(row1.EmpID, row2.EmpID)}-${Math.max(row1.EmpID, row2.EmpID)}-${row1.ProjectID}`;

                const dateFrom1 = row1.DateFrom === "NULL" ? new Date() : parseDate(row1.DateFrom);
                const dateFrom2 = row1.DateFrom === "NULL" ? new Date() : parseDate(row2.DateFrom);
                const dateTo1 = row1.DateTo === "NULL" ? new Date() : parseDate(row1.DateTo);
                const dateTo2 = row2.DateTo === "NULL" ? new Date() : parseDate(row2.DateTo);

                const maxFrom = new Date(Math.max(dateFrom1, dateFrom2));
                const minTo = new Date(Math.min(dateTo1, dateTo2));

                if (maxFrom <= minTo) {
                    const daysWorked = Math.ceil((minTo - maxFrom) / (1000 * 60 * 60 * 24));

                    if (collaborations.has(key)) {
                        collaborations.set(key, collaborations.get(key) + daysWorked);
                    } else {
                        collaborations.set(key, daysWorked);
                    }
                }
            }
        });
    });

    const results = [];
    collaborations.forEach((value, key) => {
        const [employee1, employee2, projectId] = key.split("-");
        results.push({
            employee1: parseInt(employee1),
            employee2: parseInt(employee2),
            projectId: parseInt(projectId),
            daysWorked: value,
        });
    });

    return results;
};

export { processCsv };