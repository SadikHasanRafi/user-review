export interface courseFilterPaginationParamsI {
    page:number |1 ,
    limit: number | 10,
    sortBy:string,
    sortOrder: "desc" | "asc" ,
    title?:string,
    price?:string,
    startDate?:string,
    endDate?:string,
    language?:string,
    duration?:number,

    minPrice?:number,
    maxPrice?:number,

    tags?:string,
    provider?:string,
    durationInWeeks?:number,
    level?:string
}