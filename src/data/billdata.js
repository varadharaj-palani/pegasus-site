
export const BILL_FORM_FIELDS = [
    {
        type: "text",
        heading: "Location",
        name: "location"
    },
    {
        type: "text",
        heading: "Biller Name",
        name: "billername"
    },
    {
        type: "date",
        heading: "Date",
        name: "billdate"
    },
    {
        type: "number",
        heading: "Amount",
        name: "billamount"
    },
    {
        type: "password",
        heading: "Password",
        name: "pwd"
    },
]

export const Category = [
    {
        type: "dropdown",
        heading: "Category",
        name: "category",
        dropdownValues: ["Select","DTH","Recharge","BroadBand","Electricity","Gas","Insurance","Fastag","Water"]
    }
]

export const Accounts = [
    {
        type: "dropdown",
        heading: "Choose Account",
        name: "facc",
        dropdownValues: ["Select","Savings","FD"]
    }
]