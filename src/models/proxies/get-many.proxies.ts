export interface GetManyProxy<T> { 
    current_page: number;
    data: T[];
    first_page_url: string;
    last_page_url: string;
    next_page_url: string;
    from: number;
    last_page: number;
    per_number: number;
    total: number;
    to: number;
}