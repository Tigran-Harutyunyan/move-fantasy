import { useMyFetch } from "@use/useMyFetch";
export const useConfig = async () => {
    try {
        const res = await useMyFetch("/configuration");

        if (res.images) {
            const { secure_base_url } = res.images;

            const imageUrls = {
                backdrop: secure_base_url + "original",
                poster: secure_base_url + "original",
                profile: secure_base_url + "original",
            };
            return imageUrls;
        }
    } catch (error) {
        console.log(error?.message)
    }
};