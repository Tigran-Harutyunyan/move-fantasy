import { useMyFetch } from "@use/useMyFetch";
import type { Genres } from '@types'

export const useGenres = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
        promises.push(useMyFetch(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);

    if (data && Array.isArray(data)) {
        data.map(({ genres }) => {
            return genres.map((item) => (allGenres[item.id] = item));
        });

        return (allGenres);
    }
};