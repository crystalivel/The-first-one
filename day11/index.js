//first task
const xlsx = require('xlsx');

const workbook = xlsx.readFile('./EmployeeData.xlsx');
const sheetName = workbook.SheetNames[0];
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

// second task 
function calculateBonus(salary) {
    let percentage = 0;
    if (salary < 50000) {
        percentage = 5;
    } else if (salary <= 100000) {
        percentage = 7;
    } else {
        percentage = 10;
    }

    return {
        BonusPercentage: percentage,
        BonusAmount: (salary * (percentage / 100)).toFixed(2)
    };
}

    const processedData = data.map(employee => {
        const salary = parseFloat(employee.AnnualSalary);

        if (isNaN(salary)) {
            throw new Error (`Invalid salary for ${employee.EmployeeID}`)
        }
        const bonus = calculateBonus(salary);
        return {
            ...employee,BonusPercentage: bonus.BonusPercentage + "%",BonusAmount: bonus.BonusAmount
        }
    }
    )
// third task 
const newWorkbook = xlsx.utils.book_new();
const newSheet = xlsx.utils.json_to_sheet(processedData);
xlsx.utils.book_append_sheet(newWorkbook, newSheet, "BonusResults");
xlsx.writeFile(newWorkbook, './ProccedEmployeeData.xlsx');