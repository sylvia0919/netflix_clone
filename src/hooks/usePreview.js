import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPreview = ( id ) => {
  return api.get(`/movie/${id}/videos`);
};

export const usePreviewQuery = ( id ) => {
  return useQuery({
    queryKey: ["preview", id],
    queryFn: () => fetchPreview( id ),
    select: (result) => (result.data)
  });
};
