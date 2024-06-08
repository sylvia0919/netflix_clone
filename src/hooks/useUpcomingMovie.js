import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchUpcomingMovie=()=>{
    return api.get('/movie/upcoming');
}

export const useUpcomingMovie=()=>{
    return useQuery({
        queryKey:['upcoming-movie'],
        queryFn:fetchUpcomingMovie,
        select:(result)=>result.data
    })
}