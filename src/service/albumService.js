import axiosHelper from "../api/myApi";

export const getAlbumSelect = () => {
    return axiosHelper.get(`/album/admin`)
}

export const getAlbumWithArtis = (artis) => {
    return axiosHelper.get(`/album/artis/${artis}`)
}