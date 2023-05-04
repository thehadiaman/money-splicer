import { onValue, ref } from "firebase/database";
import { database } from "../../setup";
import { USER_COLLECTION } from "../../../common/constants/collections";

export function getCurrentUserDetails(user: any, setCurrentUserDetails: Function){

    const userDetails = ref(database, USER_COLLECTION + '/' + user.uid);
    let userData = null;
    onValue(userDetails, (snapshot) => {
      userData = snapshot.val();
      setCurrentUserDetails(userData)
    });
}