// import React, { useState } from 'react';
// import '../styles/InvestmentForm.css'; // Make sure to create this CSS file
// import axios from 'axios';
// import { InvestmentScenarioRequest, ListingWithScenariosDTO, ValueInput } from '@realestatemanager/shared';
// import {
//     getAnnualAppreciationRate,
//     getAnnualInterestRate,
//     getAnnualRentIncreaseRate,
//     getAnnualTaxIncreaseRate,
//     getCapExReserveRate,
//     getClosingCosts,
//     getDownPaymentPercentage,
//     getInitialRepairCosts,
//     getInterestType,
//     getLaundryServices,
//     getLegalAndProfessionalFees,
//     getMaintenanceRate,
//     getMonthlyHOAFeesAmount,
//     getMonthlyHomeInsuranceAmount,
//     getMonthlyPropertyTax,
//     getMortgageInterest,
//     getOperatingExpenses,
//     getOtherAdditionalIncomeStreams,
//     getOtherExpensesRate,
//     getOtherInitialExpenses,
//     getPMIDropoffPoint,
//     getPMIRate,
//     getParkingFees,
//     getPrice,
//     getPropertyManagementRate,
//     getPropertyTaxes,
//     getRentEstimate,
//     getStorageUnitFees,
//     getTaxDepreciation,
//     getTermInYears,
//     getTravelingCosts,
//     getVacancyRate
// } from '../components/TableColumn';
// import { InputType, InterestType, PercentageAndAmount, ValueType } from '../constants/Constant';

// // const InvestmentForm: React.FC<{ listing: ListingWithScenariosDTO | null; }> = (data) => {
// //     if (!data) return null;
// const InvestmentForm: React.FC<{ listing: ListingWithScenariosDTO | null; }> = ({ listing }) => {
//     if (!listing) return null; // This will handle the case where listing is null


//     const [formData, setFormData] = useState(
//         {
//             downPaymentType: PercentageAndAmount.PERCENTAGE,
//             downPaymentPercentage: getDownPaymentPercentage(listing).toString(),
//             pmiRate: getPMIRate(listing),
//             pmiDropoffPoint: getPMIDropoffPoint(listing),
//             monthlyPropertyTaxType: PercentageAndAmount.AMOUNT,
//             monthlyPropertyTax: getMonthlyPropertyTax(listing),
//             monthlyHomeInsuranceAmountType: PercentageAndAmount.AMOUNT,
//             monthlyHomeInsuranceAmount: getMonthlyHomeInsuranceAmount(listing),
//             monthlyHOAFeesAmountType: PercentageAndAmount.AMOUNT,
//             monthlyHOAFeesAmount: getMonthlyHOAFeesAmount(listing),
//             annualInterestRate: getAnnualInterestRate(listing),
//             termInYears: getTermInYears(listing),
//             interestType: getInterestType(listing),
//             propertyManagementRate: getPropertyManagementRate(listing),
//             vacancyRate: getVacancyRate(listing),
//             maintenanceRate: getMaintenanceRate(listing),
//             otherExpensesRate: getOtherExpensesRate(listing),
//             capExReserveRate: getCapExReserveRate(listing),
//             legalAndProfessionalFeesType: PercentageAndAmount.AMOUNT,
//             legalAndProfessionalFees: getLegalAndProfessionalFees(listing),
//             initialRepairCostsType: PercentageAndAmount.AMOUNT,
//             initialRepairCosts: getInitialRepairCosts(listing),
//             travelingCostsType: PercentageAndAmount.AMOUNT,
//             travelingCosts: getTravelingCosts(listing),
//             closingCostsType: PercentageAndAmount.AMOUNT,
//             closingCosts: getClosingCosts(listing),
//             otherInitialExpensesType: PercentageAndAmount.AMOUNT,
//             otherInitialExpenses: getOtherInitialExpenses(listing),
//             rentEstimate: getRentEstimate(listing),
//             purchasePrice: getPrice(listing),
//             annualRentIncreaseRate: getAnnualRentIncreaseRate(listing),
//             annualAppreciationRate: getAnnualAppreciationRate(listing),
//             annualTaxIncreaseRate: getAnnualTaxIncreaseRate(listing),
//             parkingFees: getParkingFees(listing),
//             laundryServices: getLaundryServices(listing),
//             storageUnitFees: getStorageUnitFees(listing),
//             other: getOtherAdditionalIncomeStreams(listing),
//             depreciation: getTaxDepreciation(listing),
//             mortgageInterest: getMortgageInterest(listing),
//             operatingExpenses: getOperatingExpenses(listing),
//             propertyTaxes: getPropertyTaxes(listing),
//             setNewDefaultValues: false,
//         }
//     );

//     type FormProperty = {
//         title: string;
//         name: string;
//         value: number | string;
//         type: InputType | 'string';
//         hasRadioOptions?: boolean;
//         radioDetails?: { name: string, radioValue: PercentageAndAmount }; // 'Percentage' | 'Amount'; // Assuming these are the only two options
//         options?: { value: string; label: string }[]; // Correct structure for select options
//         step?: string;
//     };


//     const formDetails: FormProperty[] = [
//         {
//             title: 'Down Payment (%)',
//             name: 'downPaymentPercentage',
//             value: formData.downPaymentPercentage,
//             type: "string",
//             hasRadioOptions: true,
//             radioDetails: {
//                 name: 'downPaymentType',
//                 radioValue: formData.downPaymentType,
//             },
//         },
//         {
//             title: 'Monthly Property Tax',
//             name: 'monthlyPropertyTax',
//             value: formData.monthlyPropertyTax,
//             type: InputType.NUMBER,
//             hasRadioOptions: true,
//             radioDetails: {
//                 name: 'monthlyPropertyTaxType',
//                 radioValue: formData.monthlyPropertyTaxType,
//             },
//         },
//         {
//             title: 'Monthly Home Insurance Amount',
//             name: 'monthlyHomeInsuranceAmount',
//             value: formData.monthlyHomeInsuranceAmount,
//             type: InputType.NUMBER,
//             hasRadioOptions: true,
//             radioDetails: {
//                 name: 'monthlyHomeInsuranceAmountType',
//                 radioValue: formData.monthlyHomeInsuranceAmountType,
//             }
//         },
//         {
//             title: 'Monthly HOA Fees Amount',
//             name: 'monthlyHOAFeesAmount',
//             value: formData.monthlyHOAFeesAmount,
//             type: InputType.NUMBER,
//             hasRadioOptions: true,
//             radioDetails: {
//                 name: 'monthlyHOAFeesAmountType',
//                 radioValue: formData.monthlyHOAFeesAmountType,
//             }
//         },
//         {
//             title: 'Legal And Professional Fees (%)',
//             name: 'legalAndProfessionalFees',
//             value: formData.legalAndProfessionalFees,
//             type: InputType.NUMBER,
//             hasRadioOptions: true,
//             radioDetails: {
//                 name: 'legalAndProfessionalFeesType',
//                 radioValue: formData.legalAndProfessionalFeesType,
//             }
//         },
//         {
//             title: 'Initial Repair Costs (%)',
//             name: 'initialRepairCosts',
//             value: formData.initialRepairCosts,
//             type: InputType.NUMBER,
//             hasRadioOptions: true,
//             radioDetails: {
//                 name: 'initialRepairCostsType',
//                 radioValue: formData.initialRepairCostsType,
//             }
//         },
//         {
//             title: 'Traveling Costs',
//             name: 'travelingCosts',
//             value: formData.travelingCosts,
//             type: InputType.NUMBER,
//             hasRadioOptions: true,
//             radioDetails: {
//                 name: 'travelingCostsType',
//                 radioValue: formData.travelingCostsType,
//             }
//         },
//         {
//             title: 'Closing Costs',
//             name: 'closingCosts',
//             value: formData.closingCosts,
//             type: InputType.NUMBER,
//             hasRadioOptions: true,
//             radioDetails: {
//                 name: 'closingCostsType',
//                 radioValue: formData.closingCostsType,
//             }
//         },
//         {
//             title: 'Other Initial Expenses (%)',
//             name: 'otherInitialExpenses',
//             value: formData.otherInitialExpenses,
//             type: InputType.NUMBER,
//             hasRadioOptions: true,
//             radioDetails: {
//                 name: 'otherInitialExpensesType',
//                 radioValue: formData.otherInitialExpensesType,
//             }
//         },
//         {
//             title: 'PMI Rate (%)',
//             name: 'pmiRate',
//             value: formData.pmiRate,
//             type: InputType.NUMBER,
//         },
//         {
//             title: 'PMI Dropoff Point',
//             name: 'pmiDropoffPoint',
//             value: formData.pmiDropoffPoint,
//             type: InputType.NUMBER,
//         },
//         {
//             title: 'Annual Interest Rate (%)',
//             name: 'annualInterestRate',
//             value: formData.annualInterestRate,
//             type: InputType.NUMBER,
//             step: "0.01",
//         },
//         {
//             title: 'Term In Years',
//             name: 'termInYears',
//             value: formData.termInYears,
//             type: InputType.NUMBER,
//         },
//         {
//             title: 'Interest Type',
//             name: 'interestType',
//             value: formData.interestType,
//             type: InputType.SELECT,
//             options: Object.values(InterestType).map((enumValue => {
//                 return {
//                     value: enumValue,
//                     label: enumValue,
//                 };
//             })),
//         },
//         {
//             title: 'Property Management (%)',
//             name: 'propertyManagementRate',
//             value: formData.propertyManagementRate,
//             type: InputType.NUMBER,
//         },
//         {
//             title: 'Vacancy (%)',
//             name: 'vacancyRate',
//             value: formData.vacancyRate,
//             type: InputType.NUMBER,
//         },
//         {
//             title: 'Maintenance (%)',
//             name: 'maintenanceRate',
//             value: formData.maintenanceRate,
//             type: InputType.NUMBER,
//         },
//         {
//             title: 'Other Expenses (%)',
//             name: 'otherExpensesRate',
//             value: formData.otherExpensesRate,
//             type: InputType.NUMBER,
//         },
//         {
//             title: 'Cap Ex Reserve (%)',
//             name: 'capExReserveRate',
//             value: formData.capExReserveRate,
//             type: InputType.NUMBER,
//         },
//         {
//             title: 'Rent Estimate',
//             name: 'rentEstimate',
//             value: formData.rentEstimate,
//             type: InputType.NUMBER,
//         },
//         {
//             title: 'Purchase Price',
//             name: 'purchasePrice',
//             value: formData.purchasePrice,
//             type: InputType.NUMBER,
//         },
//         {
//             title: 'Annual Rent Increase Rate (%)',
//             name: 'annualRentIncreaseRate',
//             value: formData.annualRentIncreaseRate,
//             type: InputType.NUMBER,
//         },
//         {
//             title: 'Annual Appreciation Rate (%)',
//             name: 'annualAppreciationRate',
//             value: formData.annualAppreciationRate,
//             type: InputType.NUMBER,
//         },
//         {
//             title: 'Annual Tax Increase Rate (%)',
//             name: 'annualTaxIncreaseRate',
//             value: formData.annualTaxIncreaseRate,
//             type: InputType.NUMBER,
//         },
//         {
//             title: 'Parking Fees',
//             name: 'parkingFees',
//             value: formData.parkingFees,
//             type: InputType.NUMBER,
//         },
//         {
//             title: 'Laundry Services',
//             name: 'laundryServices',
//             value: formData.laundryServices,
//             type: InputType.NUMBER,
//         },
//         {
//             title: 'Storage Unit Fees',
//             name: 'storageUnitFees',
//             value: formData.storageUnitFees,
//             type: InputType.NUMBER,
//         },
//         {
//             title: 'Other',
//             name: 'other',
//             value: formData.other,
//             type: InputType.NUMBER,
//         },
//         {
//             title: 'Depreciation',
//             name: 'depreciation',
//             value: formData.depreciation,
//             type: InputType.NUMBER,
//         },
//         {
//             title: 'Mortgage Interest',
//             name: 'mortgageInterest',
//             value: formData.mortgageInterest,
//             type: InputType.NUMBER,
//         },
//         {
//             title: 'Operating Expenses',
//             name: 'operatingExpenses',
//             value: formData.operatingExpenses,
//             type: InputType.NUMBER,
//         },
//         {
//             title: 'Property Taxes',
//             name: 'propertyTaxes',
//             value: formData.propertyTaxes,
//             type: InputType.NUMBER,
//         },
//     ];

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value, type } = event.target;
//         if (InputType.RADIO === type) {
//             // Radio buttons have names like "{propertyName}_radio"
//             // Extract the propertyName to update the corresponding state 

//             const propertyName = name.replace("_radio", "");
//             setFormData(prevFormData => ({
//                 ...prevFormData,
//                 [propertyName]: value,
//             }));
//         } else {
//             // For number and select inputs, simply update based on name and value
//             setFormData(prevFormData => ({
//                 ...prevFormData,
//                 [name]: value,
//             }));
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         const convertToValueInput = (type: PercentageAndAmount, value: number): ValueInput | undefined => {
//             if (type === PercentageAndAmount.AMOUNT) {
//                 return {
//                     type: ValueType.AMOUNT,
//                     amount: value,
//                 };
//             }
//             else if (type === PercentageAndAmount.PERCENTAGE) {
//                 return {
//                     type: ValueType.RATE,
//                     rate: value,
//                 };
//             }
//         };

//         const getInterestType = (interestType: string): InterestType | undefined => {
//             if (InterestType.FIXED === interestType) {
//                 return InterestType.FIXED;
//             }
//             else if (InterestType.VARIABLE === interestType) {
//                 return InterestType.VARIABLE;
//             }
//         };
 

//         const dataToSubmit: InvestmentScenarioRequest = {
//             useDefaultRequest: false,
//             propertyIdentifier: {
//                 fullAddress: listing.listingDetails.propertyDetails.address?.fullAddress ?? '',
//                 zillowURL: listing.listingDetails.zillowURL,
//             },
//             investmentDetails: {
//                 mortgageDetails: {
//                     annualInterestRate: formData.annualAppreciationRate,
//                     termInYears: formData.termInYears,
//                     interestType: getInterestType(formData.interestType)!,
//                     downPayment: convertToValueInput(formData.downPaymentType, Number(formData.downPaymentPercentage))!,
//                     pmiRate: formData.pmiRate,
//                     pmiDropoffPoint: formData.pmiDropoffPoint,
//                     monthlyPropertyTax: convertToValueInput(formData.monthlyPropertyTaxType, Number(formData.monthlyPropertyTax))!,
//                     monthlyHomeInsuranceAmount: convertToValueInput(formData.monthlyHomeInsuranceAmountType, Number(formData.monthlyHomeInsuranceAmount))!,
//                     monthlyHOAFeesAmount: convertToValueInput(formData.monthlyHOAFeesAmountType, Number(formData.monthlyHOAFeesAmount))!,
//                 },
//                 operatingExpenses: {
//                     propertyManagementRate: formData.propertyManagementRate,
//                     vacancyRate: formData.vacancyRate,
//                     maintenanceRate: formData.maintenanceRate,
//                     otherExpensesRate: formData.otherExpensesRate,
//                     capExReserveRate: formData.capExReserveRate,
//                     legalAndProfessionalFees: convertToValueInput(formData.legalAndProfessionalFeesType, Number(formData.legalAndProfessionalFees)),
//                     initialRepairCosts: convertToValueInput(formData.initialRepairCostsType, Number(formData.initialRepairCosts)),
//                     travelingCosts: convertToValueInput(formData.travelingCostsType, Number(formData.travelingCosts)),
//                     closingCosts: convertToValueInput(formData.closingCostsType, Number(formData.closingCosts)),
//                     otherInitialExpenses: convertToValueInput(formData.otherInitialExpensesType, Number(formData.otherInitialExpenses)),
//                 },
//                 rentEstimate: formData.rentEstimate,
//                 purchasePrice: formData.purchasePrice,
//                 growthProjections: {
//                     annualRentIncreaseRate: formData.annualRentIncreaseRate,
//                     annualAppreciationRate: formData.annualAppreciationRate,
//                     annualTaxIncreaseRate: formData.annualTaxIncreaseRate,
//                 },
//                 additionalIncomeStreams: {
//                     parkingFees: formData.parkingFees,
//                     laundryServices: formData.laundryServices,
//                     storageUnitFees: formData.storageUnitFees,
//                     other: formData.other,
//                 },
//                 taxImplications: {
//                     depreciation: formData.depreciation,
//                     mortgageInterest: formData.mortgageInterest,
//                     operatingExpenses: formData.operatingExpenses,
//                     propertyTaxes: formData.propertyTaxes,
//                 },
//             },
//         };

//         try {
//             const response = await axios.post('http://localhost:3000/calc/calculate', dataToSubmit, {
//                 headers: { 'Content-Type': 'application/json' },
//             });
//             console.log("Calculation result:", response.data);
//             // Handle response data here
//         } catch (error) {
//             console.error("Error sending form data to backend:", error);
//             // Handle errors as needed
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="investment-form">
//             <div className="form-row">
//                 {formDetails.map((detail, index) => {
//                     if (detail.type === InputType.NUMBER || detail.type === "string") {
//                         return (
//                             <div className="form-group" key={index}>
//                                 <label>{detail.title}</label>
//                                 {/* Check if radio options should be included */}
//                                 {detail.hasRadioOptions && (
//                                     <div className="radio-group">
//                                         <div className="form-check">
//                                             <input
//                                                 className="form-check-input"
//                                                 type={InputType.RADIO}
//                                                 name={detail.radioDetails!.name + "_radio"}
//                                                 id={detail.radioDetails!.name + "_percentage"}
//                                                 value={PercentageAndAmount.PERCENTAGE}
//                                                 checked={PercentageAndAmount.PERCENTAGE === detail.radioDetails!.radioValue}
//                                                 onChange={handleChange} // Update this method to handle radio changes too
//                                             />
//                                             <label className="form-check-label" htmlFor={detail.radioDetails!.name + "_percentage"}>
//                                                 Percentage
//                                             </label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input
//                                                 className="form-check-input"
//                                                 type={InputType.RADIO}
//                                                 name={detail.radioDetails!.name + "_radio"}
//                                                 id={detail.radioDetails!.name + "_amount"}
//                                                 value={PercentageAndAmount.AMOUNT}
//                                                 checked={PercentageAndAmount.AMOUNT === detail.radioDetails!.radioValue}
//                                                 onChange={handleChange} // Update this method to handle radio changes too
//                                             />
//                                             <label className="form-check-label" htmlFor={detail.radioDetails!.name + "_amount"}>
//                                                 Amount
//                                             </label>
//                                         </div>
//                                     </div>
//                                 )}
//                                 <input
//                                     type={InputType.NUMBER}
//                                     name={detail.name}
//                                     value={detail.value}
//                                     onChange={handleChange}
//                                     className="form-control"
//                                     step={detail.step || "1"} // Use provided step or default to "1"
//                                 />
//                             </div>
//                         );
//                     } else if (detail.type === InputType.SELECT) {
//                         return (
//                             <div className="form-group" key={index}>
//                                 <label>{detail.title}</label>
//                                 <select
//                                     name={detail.name}
//                                     value={detail.value}
//                                     onChange={handleChange}
//                                     className="form-control"
//                                 >
//                                     {detail.options!.map((option, optionIndex) => (
//                                         <option key={optionIndex} value={option.value}>
//                                             {option.label}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                         );
//                     }
//                     // Potentially add more conditionals for other types of inputs
//                     return null; // For items with unsupported or no type specified
//                 })}
//             </div>
//             <button type="submit">Calculate</button>
//         </form>
//     );


// };

// export default InvestmentForm;
