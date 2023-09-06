import { differenceInDays, differenceInMonths, differenceInWeeks } from "date-fns";
import { SavingsFrequency } from "../types/savingsType";

export function formatDate(dateString: string) {
    const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
}

export function dateDifference(differenceType: SavingsFrequency, endDate: Date, startDate: Date) {
    switch(differenceType) {
        case SavingsFrequency.DAILY:
            return differenceInDays(endDate, startDate);
        case SavingsFrequency.WEEKLY:
            return differenceInWeeks(endDate, startDate);
        case SavingsFrequency.MONTHLY:
            return differenceInMonths(endDate, startDate);
        default:
            return null;
    }
}