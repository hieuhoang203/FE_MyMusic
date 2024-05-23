import React, {createContext, useState} from "react";

export const AdminContext = createContext();
const AdminProvider = ({children}) => {

    const [songData, setSongData] = useState(0);

    const [podcastData, setPodcastData] = useState(0);

    return (
        <AdminContext.Provider value={[{ songData, setSongData }, { podcastData, setPodcastData }]}>
            {children}
        </AdminContext.Provider>
    );

}

export default AdminProvider;