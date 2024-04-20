export interface Results {
    dates: Dates
    page: number
    results: Movie[]
    total_pages: number
    total_results: number
}

export interface Dates {
    maximum: string
    minimum: string
}

export interface Movie {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    first_air_date?: string
    media_type?: string
    name?: string
}


export interface Config {
    images: Images
    change_keys: string[]
}

export interface Images {
    base_url: string
    secure_base_url: string
    backdrop_sizes: string[]
    logo_sizes: string[]
    poster_sizes: string[]
    profile_sizes: string[]
    still_sizes: string[]
}

export interface Genres {
    genres: Genre[]
}

export interface Genre {
    id: number
    name: string
}

export interface ImageURLs {
    backdrop: string
    poster: string
    profile: string
}

export interface Person {
    adult: boolean
    also_known_as: string[]
    biography: string
    birthday: string
    deathday: any
    gender: number
    homepage: string
    id: number
    imdb_id: string
    known_for_department: string
    name: string
    place_of_birth: string
    popularity: number
    profile_path: string
}