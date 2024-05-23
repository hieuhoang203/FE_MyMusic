import React, {createContext, useState} from "react";

export const ArtisContext = createContext();
const ArtisProvider = ({children}) => {

    const [songData, setSongData] = useState(0);

    const [podcastData, setPodcastData] = useState(0);

    return (
        <ArtisContext.Provider value={[{ songData, setSongData }, { podcastData, setPodcastData }]}>
            {children}
        </ArtisContext.Provider>
    );

}

export default ArtisProvider;