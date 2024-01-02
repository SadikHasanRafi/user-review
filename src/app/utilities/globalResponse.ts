const globalResponse = (success:boolean,statusCode:number,message:string,data:any,meta?:any) => {
    if (meta) {
        return {
            success,statusCode,message,meta,data
        }
    }else{
        return {
            success,statusCode,message,data
        }
    }
}

export default globalResponse