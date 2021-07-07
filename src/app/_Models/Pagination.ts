export interface IPagination{
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class paginatedResults<T>{
    results: T;
    pagination: IPagination;
}