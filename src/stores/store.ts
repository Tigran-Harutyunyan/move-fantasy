import { defineStore } from 'pinia';
import type { Genres, ImageURLs } from '@types'
import { ref } from 'vue';

export const useStore = defineStore('main', () => {
    const genres = ref<Genres>();
    const imageUrls = ref<ImageURLs>();

    const setImageURLs = (data: ImageURLs) => {
        imageUrls.value = data;
    }

    const setGenres = (data: Genres) => {
        genres.value = data;
    }

    return {
        genres,
        imageUrls,
        setImageURLs,
        setGenres
    }
})