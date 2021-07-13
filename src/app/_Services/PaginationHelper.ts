import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { paginatedResults } from "../_Models/Pagination";

export function newMethod<T>(Url: string, params: HttpParams, Http:HttpClient) {
    const PaginationResults: paginatedResults<T> = new paginatedResults<T>();
    return Http.get<T>(Url,{ observe: 'response', params }).pipe(
      map(response => {
        PaginationResults.results = response.body;
        if (response.headers.get('pagination') !== null) {
          PaginationResults.pagination = JSON.parse(response.headers.get('pagination'));
        }
        return PaginationResults;
      })
    );
  }

export function getPagination(pageNumber:number,pageSize:number){
    let params = new HttpParams(); 
    if (pageNumber !== undefined && pageSize !== undefined)
    console.log(pageNumber,pageSize);
      params.append('pageNumber',pageNumber.toString());
      params.append('pageSize',pageSize.toString()); 
      console.log(params)
      return params;
  }