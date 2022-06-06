export const LOAN_ACCOUNT_FORM_FIELDS = [
    {
        type: "text",
        heading: "Mail",
        name: "email"
    },
    {
        type: "text",
        heading: "Account No",
        name: "accno"
    },

    {
        type: "text",
        heading: "Sanctioned By",
        name: "sanctby"
    },
    {
        type: "number",
        heading: "Principle",
        name: "principle"
    },
    {
        type: "number",
        heading: "Term",
        name: "term"
    },
    {
        type: "number",
        heading: "Interestrate",
        name: "interestrate"
    },

]

export const LoanType = [
    {
        type: "dropdown",
        heading: "Loan Type",
        name: "loanType",
        dropdownValues: ["Select", "Personal loan", "Fixed Deposit", "Property", "Gold loan", "Credit cards"]
    }





]