
export const BILL_FORM_FIELDS = [
    {
        type: "number",
        heading: "Amount",
        name: "amount"
    },
    {
        type: "text",
        heading: "To Account",
        name: "toacc"
    },
    {
        type: "textarea",
        heading: "Purpose",
        name: "purpose"
    },
    {
        type: "password",
        heading: "Password",
        name: "pwd"
    },
]

export const Accounts = [
    {
        type: "dropdown",
        heading: "Choose Account",
        name: "facc",
        dropdownValues: ["Select","Savings","FD"]
    }
]