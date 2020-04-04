export default interface Event {
    id?: number,
    name: string,
    unit: string,
    eventList: string,
    theme: string,
    content: string,
    fromDateMenu: string,
    fromTimeMenu: string,
    errors?: string,
    formTouched?: string,
    errorMessages?: string,
}
