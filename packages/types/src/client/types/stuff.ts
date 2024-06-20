enum InputType {
    TEXT = 'text',
    SELECT = 'select',
    NUMBER = 'number',
    RADIO = 'radio',
    STRING = 'string',
    CHECKBOX = 'checkbox',
};

const propertiesListColumns = [
    {
        header: "Property Type",
        accessor: "propertyType",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Full Address",
        accessor: "fullAddress",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "State",
        accessor: "state",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Zip Code",
        accessor: "zipcode",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Zillow URL",
        accessor: "zillowURL",
        inputType: InputType.STRING,
        isURL: true,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Price",
        accessor: "price",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: true,
        isEditable: true,
    },
    {
        header: "Rent Estimate",
        accessor: "rentEstimate",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: true,
        isEditable: true,
    },
    {
        header: "Initial Costs",
        accessor: "initialCosts",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: true,
        detailedDescription: `downPaymentAmount + 
                        legalAndProfessionalFees + 
                        initialRepairCosts + 
                        travelingCosts + 
                        closingCosts + 
                        otherInitialExpenses`,
    },
    {
        header: "Loan Amount",
        accessor: "loanAmount",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: true,
    },
    {
        header: "Down Payment",
        accessor: "downPaymentAmount",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: true
    },
    {
        header: "Annual Interest Rate",
        accessor: "annualInterestRate",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        addSuffix: '%',
        isSortable: true,
    },
    {
        header: "ROI",
        accessor: "ROI",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        addSuffix: '%',
        isSortable: true,
    },
    {
        header: "Cap Rate",
        accessor: "capRate",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        addSuffix: '%',
        isSortable: true,
    },
    {
        header: "Recurring Costs",
        accessor: "recurringCosts",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: true,
        detailedDescription: `propertyManagementAmount + 
                        vacancyAmount +
                        maintenanceAmount +
                        otherExpensesAmount +
                        capExReserveAmount`,
    },
    {
        header: "Monthly Payment",
        accessor: "initialMonthlyAmount",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: true,
        detailedDescription: ` Mortgage Amount +
                                Property Tax Amount +
                                Monthly Home Insurance Amount +
                                Monthly HOA Fees Amount`,
    },
    {
        header: "Mortgage Amount",
        accessor: "mortgage",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: true,
    },
    {
        header: "Monthly Cash Flow",
        accessor: "monthlyCashFlow",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: true,
    },
    {
        header: "Yearly Cash Flow",
        accessor: "yearlyCashFlow",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: true,
    },
    {
        header: "Number of Days On Market",
        accessor: "numberOfDaysOnMarket",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Date Listed",
        accessor: "dateListed",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Date Created",
        accessor: "dateCreated",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "City",
        accessor: "city",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "County",
        accessor: "county",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Country",
        accessor: "country",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Street Address",
        accessor: "streetAddress",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Apartment Number",
        accessor: "apartmentNumber",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: false,
    },
    {
        header: "Longitude",
        accessor: "longitude",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: false,
    },
    {
        header: "Latitude",
        accessor: "latitude",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: false,
    },
    {
        header: "Elementary School Rating",
        accessor: "elementarySchoolRating",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
        isEditable: true,
    },
    {
        header: "Middle School Rating",
        accessor: "middleSchoolRating",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
        isEditable: true,
    },
    {
        header: "High School Rating",
        accessor: "highSchoolRating",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
        isEditable: true,
    },
    {
        header: "Number Of Bedrooms",
        accessor: "numberOfBedrooms",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
        isEditable: true,
    },
    {
        header: "Number Of Full Bathrooms",
        accessor: "numberOfFullBathrooms",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
        isEditable: true,
    },
    {
        header: "Number Of Half Bathrooms",
        accessor: "numberOfHalfBathrooms",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
        isEditable: true,
    },
    {
        header: "Square Feet",
        accessor: "squareFeet",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
        isEditable: true,
    },
    {
        header: "Acres",
        accessor: "acres",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
        isEditable: true,
    },
    {
        header: "Year Built",
        accessor: "yearBuilt",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
        isEditable: true,
    },
    {
        header: "Has Garage",
        accessor: "hasGarage",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
        isEditable: true,
    },
    {
        header: "Has Pool",
        accessor: "hasPool",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
        isEditable: true,
    },
    {
        header: "Has Basement",
        accessor: "hasBasement",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
        isEditable: true,
    },
    {
        header: "Listing Price",
        accessor: "listingPrice",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: false,
        isDollarAmount: true,
        isSortable: true,
        isEditable: true,
    },
    {
        header: "Zestimate",
        accessor: "zestimate",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: false,
        isDollarAmount: true,
        isSortable: true,
        isEditable: true,
    },
    {
        header: "Zillow Rent Estimate",
        accessor: "zillowRentEstimate",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: false,
        isDollarAmount: true,
        isSortable: true,
        isEditable: true,
    },
    {
        header: "Zillow Range Low",
        accessor: "zestimateRangeLow",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: false,
        isDollarAmount: true,
        isSortable: true,
        isEditable: true,
    },
    {
        header: "Zillow Range High",
        accessor: "zestimateRangeHigh",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: false,
        isDollarAmount: true,
        isSortable: true,
        isEditable: true,
    },
    {
        header: "Zillow Monthly Property Tax Amount",
        accessor: "zillowMonthlyPropertyTaxAmount",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: false,
        isDollarAmount: true,
        isSortable: true,
        isEditable: true,
    },
    {
        header: "Zillow Monthly Home Insurance Amount",
        accessor: "zillowMonthlyHomeInsuranceAmount",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: false,
        isDollarAmount: true,
        isSortable: true,
        isEditable: true,
    },
    {
        header: "Zillow Monthly HOA Fees Amount",
        accessor: "zillowMonthlyHOAFeesAmount",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: false,
        isDollarAmount: true,
        isSortable: true,
        isEditable: true,
    },
    {
        header: "Creation Type",
        accessor: "creationType",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: false,
    },
    {
        header: "Description",
        accessor: "description",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: false,
        isEditable: true,
    },
];

//     private _accessor: PropertyColumnAccessorEnum = PropertyColumnAccessorEnum.ACRES;
//     private _inputType: InputType = InputType.NUMBER;
//     private _isUrl: boolean = false;
//     private _isDollarAmount: boolean = false;
//     private _addSuffix: string = '';

// constructor(
//     showColumn: boolean = true,
//     isEditable: boolean = true,
//     isSortable: boolean = true,
// ) {
//     super(showColumn, isEditable, isSortable);
// }


function hi() {

    for (let col of propertiesListColumns) {
        let append = '\n\n\n';
        append += '---' + col.header + '---\n';
        if (col.inputType === InputType.CHECKBOX) {
            append += `private _inputType: InputType = InputType.CHECKBOX;`;
        }
        else if (col.inputType === InputType.NUMBER) {
            append += `private _inputType: InputType = InputType.NUMBER;`;
        }
        else if (col.inputType === InputType.RADIO) {
            append += `private _inputType: InputType = InputType.RADIO;`;
        }
        else if (col.inputType === InputType.SELECT) {
            append += `private _inputType: InputType = InputType.SELECT;`;
        }
        else if (col.inputType === InputType.STRING) {
            append += `private _inputType: InputType = InputType.STRING;`;
        }
        else if (col.inputType === InputType.TEXT) {
            append += `private _inputType: InputType = InputType.TEXT;`;
        }
        append += '\n';
        append += `private _isUrl: boolean = ${col.isURL === undefined ? false : col.isURL};\n`;
        append += `private _isDollarAmount: boolean = ${col.isDollarAmount === undefined ? false : col.isDollarAmount};\n`;
        append += `private _addSuffix: string = ${col.addSuffix === undefined ? "''" : col.addSuffix};\n`;
        append += '\n';
        append += 'constructor(\n';
        append += `    showColumn: boolean = ${col.showColumn === undefined ? false : col.showColumn},\n`;
        append += `    isEditable: boolean = ${col.isEditable === undefined ? false : col.isEditable},\n`;
        append += `    isSortable: boolean = ${col.isSortable === undefined ? false : col.isSortable},\n`;
        append += ') {\n';
        append += '    super(showColumn, isEditable, isSortable);\n';
        append += '}\n';

        console.log(append);
        console.log('------------------------------------------------------------------------------------------------------------');
    }

}

hi();