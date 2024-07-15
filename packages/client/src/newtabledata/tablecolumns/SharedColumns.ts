import {
    AgentResponseDTO,
    ColumnDetail,
    DummyCSVDataType,
    HighYeildSavingsResponseDTO,
    InputType,
    ListingWithScenariosResponseDTO,
    MonthlyInvestmentDetailsResponseDTO,
    PrimitiveType,
    TableType,
    ValidationValue
} from "@realestatemanager/types";
import { InvestmentDetailsTableHelper } from "../../newutilities/InvestmentDetailsTableHelper";
import { PropertiesListTableHelper } from "../../newutilities/PropertiesListTableHelper";
import { isNonNegativeNumber, isNonNegativeWholeNumber } from "../../constants/Constant";

export const YearColumn: ColumnDetail = {
    title: "Year",
    accessor: "year",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getYear(monthlyInvestmentDetails);
        }
    },
    [TableType.HIGH_YIELD_SAVINGS_TABLE]: {
        value: (highYeildSavings: HighYeildSavingsResponseDTO): PrimitiveType => {
            return highYeildSavings.year;
        }
    }
};

export const MonthColumn: ColumnDetail = {
    title: "Month",
    accessor: "month",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getMonth(monthlyInvestmentDetails);
        }
    },
    [TableType.HIGH_YIELD_SAVINGS_TABLE]: {
        value: (highYeildSavings: HighYeildSavingsResponseDTO): PrimitiveType => {
            return highYeildSavings.month;
        }
    }
};

export const DateColumn: ColumnDetail = {
    title: "Date",
    accessor: "date",
    inputType: InputType.STRING,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getDate(monthlyInvestmentDetails);
        }
    },
    [TableType.HIGH_YIELD_SAVINGS_TABLE]: {
        value: (highYeildSavings: HighYeildSavingsResponseDTO): PrimitiveType => {
            return highYeildSavings.date;
        }
    }
};

export const MortgageAmountColumn: ColumnDetail = {
    title: "Mortgage Amount",
    accessor: "mortgage",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getMortgage(listingWithScenarios);
        }
    },
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getMortgageAmount(ammortizationDetail);
        }
    }
};

export const RentEstimateColumn: ColumnDetail = {
    title: "Rent Estimate",
    accessor: "rentEstimate",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getRentEstimate(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setRentEstimate(listingWithScenarios, Number(newValue));
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: false,
                    message: 'Must have a rent value',
                };
            }
            if (!isNonNegativeWholeNumber(newValue.toString())) {
                return {
                    isValid: false,
                    message: 'Not a valid Rent value (must be whole number and => 0',
                };
            }
            return {
                isValid: true
            };
        }
    },
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getRentEstimate(ammortizationDetail);
        }
    }
};

export const MonthlyCashFlowColumn: ColumnDetail = {
    title: "Monthly Cash Flow",
    accessor: "monthlyCashFlow",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getMonthlyCashFlow(listingWithScenarios);
        }
    },
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getMonthlyCashFlow(ammortizationDetail);
        }
    }
};

export const CapRateColumn: ColumnDetail = {
    title: "Cap Rate",
    accessor: "capRate",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "%",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getCapRate(listingWithScenarios);
        }
    },
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getCapRate(ammortizationDetail);
        }
    }
};

export const ROIColumn: ColumnDetail = {
    title: "ROI",
    accessor: "ROI",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "%",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getROI(listingWithScenarios);
        }
    },
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getReturnOnInvestment(ammortizationDetail);
        }
    }
};

export const CountryColumn: ColumnDetail = {
    title: "Country",
    accessor: "country",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getCountry(listingWithScenarios);
        }
    },
    [TableType.AGENT_TABLE]: {
        value: (agent: AgentResponseDTO): PrimitiveType => {
            return agent.country;
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.country;
        }
    }
};

export const StateColumn: ColumnDetail = {
    title: "State",
    accessor: "state",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getState(listingWithScenarios);
        }
    },
    [TableType.AGENT_TABLE]: {
        value: (agent: AgentResponseDTO): PrimitiveType => {
            return agent.state;
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.state;
        }
    }
};

export const PropertyTypeColumn: ColumnDetail = {
    title: "Property Type",
    accessor: "propertyType",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getPropertyType(listingWithScenarios);
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.propertyType;
        }
    }
};

export const PropertyStatusColumn: ColumnDetail = {
    title: "Property Status",
    accessor: "propertyStatus",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getPropertyStatus(listingWithScenarios);
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.propertyStatus;
        }
    }
};

export const FullAddressColumn: ColumnDetail = {
    title: "Full Address",
    accessor: "fullAddress",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getFullAddress(listingWithScenarios);
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.fullAddress;
        }
    }
};

export const ZipCodeColumn: ColumnDetail = {
    title: "Zip Code",
    accessor: "zipcode",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getZipCode(listingWithScenarios);
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.zipcode;
        }
    }
};

export const ZillowUrlColumn: ColumnDetail = {
    title: "Zillow Url",
    accessor: "zillowUrl",
    inputType: InputType.TEXT,
    isUrl: true,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getZillowURL(listingWithScenarios);
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.zillowURL;
        }
    }
};

export const NumberOfDaysOnMarketColumn: ColumnDetail = {
    title: "Number of Days On Market",
    accessor: "numberOfDaysOnMarket",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getNumberOfDaysOnMarket(listingWithScenarios);
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.numberOfDaysOnMarket;
        }
    }
};

export const CityColumn: ColumnDetail = {
    title: "City",
    accessor: "city",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getCity(listingWithScenarios);
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.city;
        }
    }
};

export const CountyColumn: ColumnDetail = {
    title: "County",
    accessor: "county",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getCounty(listingWithScenarios);
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.county;
        }
    }
};

export const StreetAddressColumn: ColumnDetail = {
    title: "Street Address",
    accessor: "streetAddress",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getStreetAddress(listingWithScenarios);
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.streetAddress;
        }
    }
};

export const ApartmentNumberColumn: ColumnDetail = {
    title: "Apartment Number",
    accessor: "apartmentNumber",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getApartmentNumber(listingWithScenarios);
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.apartmentNumber;
        }
    }
};

export const LongitudeColumn: ColumnDetail = {
    title: "Longitude",
    accessor: "longitude",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getLongitude(listingWithScenarios);
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.longitude;
        }
    }
};

export const LatitudeColumn: ColumnDetail = {
    title: "Latitude",
    accessor: "latitude",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getLatitude(listingWithScenarios);
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.latitude;
        }
    }
};

export const ElementarySchoolRatingColumn: ColumnDetail = {
    title: "Elementary School Rating",
    accessor: "elementarySchoolRating",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getElementarySchoolRating(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setElementarySchoolRating(listingWithScenarios, Number(newValue));
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: false,
                    message: 'Must have a school rating value',
                };
            }
            if (!isNonNegativeWholeNumber(newValue.toString(), (num: number) => { return num > 0 || num <= 10 })) {
                return {
                    isValid: false,
                    message: 'Not a valid school rating value (must be whole number and between greater than 0 and less than or equal to 10',
                };
            }
            return {
                isValid: true
            };
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.elementarySchoolRating;
        }
    }
};

export const MiddleSchoolRatingColumn: ColumnDetail = {
    title: "Middle School Rating",
    accessor: "middleSchoolRating",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getMiddleSchoolRating(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setMiddleSchoolRating(listingWithScenarios, Number(newValue));
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: false,
                    message: 'Must have a school rating value',
                };
            }
            if (!isNonNegativeWholeNumber(newValue.toString(), (num: number) => { return num > 0 || num <= 10 })) {
                return {
                    isValid: false,
                    message: 'Not a valid school rating value (must be whole number and between greater than 0 and less than or equal to 10',
                };
            }
            return {
                isValid: true
            };
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.middleSchoolRating;
        }
    }
};

export const HighSchoolRatingColumn: ColumnDetail = {
    title: "High School Rating",
    accessor: "highSchoolRating",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getHighSchoolRating(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setHighSchoolRating(listingWithScenarios, Number(newValue));
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: false,
                    message: 'Must have a school rating value',
                };
            }
            if (!isNonNegativeWholeNumber(newValue.toString(), (num: number) => { return num > 0 || num <= 10 })) {
                return {
                    isValid: false,
                    message: 'Not a valid school rating value (must be whole number and between greater than 0 and less than or equal to 10',
                };
            }
            return {
                isValid: true
            };
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.highSchoolRating;
        }
    }
};

export const NumberOfBedroomsColumn: ColumnDetail = {
    title: "Number Of Bedrooms",
    accessor: "numberOfBedrooms",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getNumberOfBedrooms(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setNumberOfBedrooms(
                listingWithScenarios,
                newValue === undefined ? undefined : Number(newValue)
            );
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            // Undefined value is okay
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: true,
                };
            }
            if (!isNonNegativeWholeNumber(newValue.toString())) {
                return {
                    isValid: false,
                    message: 'Not a valid  Number Of Bedrooms value',
                };
            }
            return {
                isValid: true
            };
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.numberOfBedrooms;
        }
    }
};

export const NumberOfFullBathroomsColumn: ColumnDetail = {
    title: "Number Of Full Bathrooms",
    accessor: "numberOfFullBathrooms",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getNumberOfFullBathrooms(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setNumberOfFullBathrooms(
                listingWithScenarios,
                newValue === undefined ? undefined : Number(newValue)
            );
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            // Undefined value is okay
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: true,
                };
            }
            if (!isNonNegativeWholeNumber(newValue.toString())) {
                return {
                    isValid: false,
                    message: 'Not a valid  Number Of Full Bathrooms value',
                };
            }
            return {
                isValid: true
            };
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.numberOfFullBathrooms;
        }
    }
};

export const NumberOfHalfBathroomsColumn: ColumnDetail = {
    title: "Number Of Half Bathrooms",
    accessor: "numberOfHalfBathrooms",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getNumberOfHalfBathrooms(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setNumberOfHalfBathrooms(
                listingWithScenarios,
                newValue === undefined ? undefined : Number(newValue)
            );
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            // Undefined value is okay
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: true,
                };
            }
            if (!isNonNegativeWholeNumber(newValue.toString())) {
                return {
                    isValid: false,
                    message: 'Not a valid  Number Of Half Bathrooms value',
                };
            }
            return {
                isValid: true
            };
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.numberOfHalfBathrooms;
        }
    }
};

export const SquareFeetColumn: ColumnDetail = {
    title: "Square Feet",
    accessor: "squareFeet",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getSquareFeet(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setSquareFeet(
                listingWithScenarios,
                newValue === undefined ? undefined : Number(newValue)
            );
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            // Undefined value is okay
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: true,
                };
            }
            if (!isNonNegativeWholeNumber(newValue.toString())) {
                return {
                    isValid: false,
                    message: 'Not a valid Square Feet value',
                };
            }
            return {
                isValid: true
            };
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.squareFeet;
        }
    }
}

export const AcresColumn: ColumnDetail = {
    title: "Acres",
    accessor: "acres",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getAcres(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setAcres(
                listingWithScenarios,
                newValue === undefined ? undefined : Number(newValue)
            );
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            // Undefined value is okay
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: true,
                };
            }
            if (!isNonNegativeNumber(newValue.toString())) {
                return {
                    isValid: false,
                    message: 'Not a valid Acres value',
                };
            }
            return {
                isValid: true
            };
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.acres;
        }
    }
};

export const YearBuiltColumn: ColumnDetail = {
    title: "Year Built",
    accessor: "yearBuilt",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getYearBuilt(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setYearBuilt(
                listingWithScenarios,
                newValue === undefined ? undefined : Number(newValue)
            );
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            // Undefined value is okay
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: true,
                };
            }
            if (!isNonNegativeWholeNumber(newValue.toString())) {
                return {
                    isValid: false,
                    message: 'Not a valid Year Built value',
                };
            }
            return {
                isValid: true
            };
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.yearBuilt;
        }
    }
};

export const HasGarageColumn: ColumnDetail = {
    title: "Has Garage",
    accessor: "hasGarage",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.hasGarage(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setHasGarage(
                listingWithScenarios,
                newValue === undefined ? undefined : newValue.toString().toLocaleLowerCase() === 'true'
            );
        },
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.hasGarage;
        }
    }
};

export const HasPoolColumn: ColumnDetail = {
    title: "Has Pool",
    accessor: "hasPool",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.hasPool(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setHasPool(
                listingWithScenarios,
                newValue === undefined ? undefined : newValue.toString().toLocaleLowerCase() === 'true'
            );
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.hasPool;
        }
    }
};

export const HasBasementColumn: ColumnDetail = {
    title: "Has Basement",
    accessor: "hasBasement",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.hasBasement(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setHasBasement(
                listingWithScenarios,
                newValue === undefined ? undefined : newValue.toString().toLocaleLowerCase() === 'true'
            );
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.hasBasement;
        }
    }
};

export const ListingPriceColumn: ColumnDetail = {
    title: "Listing Price",
    accessor: "listingPrice",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: false,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getListingPrice(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setListingPrice(listingWithScenarios, Number(newValue));
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: false,
                    message: 'Must have a Listing Price',
                };
            }
            if (!isNonNegativeWholeNumber(newValue.toString())) {
                return {
                    isValid: false,
                    message: 'Not a valid Listing Price (must be whole number and => 0',
                };
            }
            return {
                isValid: true
            };
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.listingPrice;
        }
    }
};

export const ZestimateColumn: ColumnDetail = {
    title: "Zestimate",
    accessor: "zestimate",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: false,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getZestimate(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setZestimate(
                listingWithScenarios,
                newValue === undefined ? undefined : Number(newValue)
            );
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            // Undefined value is okay
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: true,
                };
            }
            if (!isNonNegativeWholeNumber(newValue.toString())) {
                return {
                    isValid: false,
                    message: 'Not a valid Zestimate Price (must be whole number and => 0',
                };
            }
            return {
                isValid: true
            };
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.zestimate;
        }
    }
};

export const ZillowRentEstimateColumn: ColumnDetail = {
    title: "Zillow Rent Estimate",
    accessor: "zillowRentEstimate",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: false,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getZillowRentEstimate(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setZillowRentEstimate(
                listingWithScenarios,
                newValue === undefined ? undefined : Number(newValue)
            )
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            // Undefined value is okay
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: true,
                };
            }
            if (!isNonNegativeWholeNumber(newValue.toString())) {
                return {
                    isValid: false,
                    message: 'Not a valid Zillow Rent Estimate (must be whole number and => 0',
                };
            }
            return {
                isValid: true
            };
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.zillowRentEstimate;
        }
    }
};

export const ZestimateRangeLowColumn: ColumnDetail = {
    title: "Zillow Range Low",
    accessor: "zestimateRangeLow",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: false,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getZestimateRangeLow(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setZestimateRangeLow(
                listingWithScenarios,
                newValue === undefined ? undefined : Number(newValue)
            );
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            // Undefined value is okay
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: true,
                };
            }
            if (!isNonNegativeWholeNumber(newValue.toString())) {
                return {
                    isValid: false,
                    message: 'Not a valid Zestimate Range Low Price (must be whole number and => 0',
                };
            }
            return {
                isValid: true
            };
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.zestimateRangeLow;
        }
    }
};

export const ZestimateRangeHighColumn: ColumnDetail = {
    title: "Zillow Range High",
    accessor: "zestimateRangeHigh",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: false,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getZestimateRangeHigh(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setZestimateRangeHigh(
                listingWithScenarios,
                newValue === undefined ? undefined : Number(newValue)
            );
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            // Undefined value is okay
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: true,
                };
            }
            if (!isNonNegativeWholeNumber(newValue.toString())) {
                return {
                    isValid: false,
                    message: 'Not a valid Zestimate Range High Price (must be whole number and => 0',
                };
            }
            return {
                isValid: true
            };
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.zestimateRangeHigh;
        }
    }
};

export const ZillowMonthlyPropertyTaxAmountColumn: ColumnDetail = {
    title: "Zillow Monthly Property Tax Amount",
    accessor: "zillowMonthlyPropertyTaxAmount",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: false,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getZillowMonthlyPropertyTaxAmount(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setZillowMonthlyPropertyTaxAmount(
                listingWithScenarios,
                newValue === undefined ? undefined : Number(newValue)
            );
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            // Undefined value is okay
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: true,
                };
            }
            if (!isNonNegativeWholeNumber(newValue.toString())) {
                return {
                    isValid: false,
                    message: 'Not a valid Zillow Monthly Property Tax Price (must be whole number and => 0',
                };
            }
            return {
                isValid: true
            };
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.zillowMonthlyPropertyTaxAmount;
        }
    }
};

export const ZillowMonthlyHomeInsuranceAmountColumn: ColumnDetail = {
    title: "Zillow Monthly Home Insurance Amount",
    accessor: "zillowMonthlyHomeInsuranceAmount",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: false,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getZillowMonthlyHomeInsuranceAmount(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setZillowMonthlyHomeInsuranceAmount(
                listingWithScenarios,
                newValue === undefined ? undefined : Number(newValue)
            );
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            // Undefined value is okay
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: true,
                };
            }
            if (!isNonNegativeWholeNumber(newValue.toString())) {
                return {
                    isValid: false,
                    message: 'Not a valid Zillow Monthly Home Insurance Price (must be whole number and => 0',
                };
            }
            return {
                isValid: true
            };
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.zillowMonthlyHomeInsuranceAmount;
        }
    }
};

export const ZillowMonthlyHOAFeesAmountColumn: ColumnDetail = {
    title: "Zillow Monthly HOA Fees Amount",
    accessor: "zillowMonthlyHOAFeesAmount",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: false,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getZillowMonthlyHOAFeesAmount(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setZillowMonthlyHOAFeesAmount(
                listingWithScenarios,
                newValue === undefined ? undefined : Number(newValue)
            );
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            // Undefined value is okay
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: true,
                };
            }
            if (!isNonNegativeWholeNumber(newValue.toString())) {
                return {
                    isValid: false,
                    message: 'Not a valid Zillow Monthly HOA Fee Amount (must be whole number and => 0',
                };
            }
            return {
                isValid: true
            };
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.zillowMonthlyHOAFeesAmount;
        }
    }
};

export const DescriptionColumn: ColumnDetail = {
    title: "Description",
    accessor: "description",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
    isEditable: true,
    isSortable: false,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getDescription(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setDescription(
                listingWithScenarios,
                newValue === undefined ? "" : newValue.toString()
            );
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            if (newValue && newValue.toString().length > 1000) {
                return {
                    isValid: false,
                    message: 'Description must be less than or equal to 1000 characters',
                };
            }
            return {
                isValid: true
            };
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.description;
        }
    }
};