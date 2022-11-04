import { doc, setDoc, getDoc, getDocs, collection, query } from "firebase/firestore";
import { GAMES_COLLECTION } from "../contants/collections.constant";
import { db } from "../firebase/setupFirebase";
import { IGame } from "../interfaces/games.interface";
class AdminService {
    getAllGames = (): any => new Promise(async (resolve: any, reject: any) => {
        const q = query(collection(db, GAMES_COLLECTION));
        const querySnapshot = await getDocs(q);
        let data: IGame[] = [];
        await querySnapshot.forEach(item => {
            let itemData: any = item.data();
            data.push(itemData);
        });
        console.log("Admin get all games: ", data);
        resolve(data);
    }   )

    addNewGame = (data: {title: string, description: string, created_by: string}): any => new Promise(async (resolve: any, reject: any) => {
        const {id} = await doc(collection(db, GAMES_COLLECTION));
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
            id
        }
        await setDoc(doc(db, GAMES_COLLECTION, id), requestBody);
        resolve(requestBody);
    })

    editGame = () => {

    }
}

export default new AdminService();