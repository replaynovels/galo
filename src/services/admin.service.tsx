import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { db } from "../firebase/setupFirebase";
import { IGame } from "../interfaces/games.interface";
class AdminService {
    getAllGames = () => {

    }

    addNewGame = async (data: {title: string, description: string, created_by: string}) => {
        const now = new Date().toISOString();
        const requestBody: IGame = {
            title: data.title,
            description: data.description,
            thumbnail: null,
            updated_date: now,
            updated_by: data.created_by,
            created_date: now,
            created_by: data.created_by,
            downloads: 0,
            revenue: 0,
            number_of_levels: 0,
            images: [],
            price: 0,
            level_ids: [],
        }
        await setDoc(doc(db, "games", data.title), requestBody);
        return requestBody;
    }

    editGame = () => {

    }
}

export default new AdminService();