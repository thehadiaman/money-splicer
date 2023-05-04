import { signOutUser } from "../../../firebase/services/login/login.service";
import TopNavigation from "../../common/top-navigation";
import { Route, Routes } from 'react-router-dom';
import HomeContainer from "./home-page";
import RoomPage from "../../room";

export default function LoggedInPageContainer(props: any) {

    const navMenu = [
        {
            type: 'link',
            displayName: 'Home Page',
            status: 'active',
            link: '/'
        },
        {
            btnName: props.currentUserDetails?.['name'] || '',
            type: 'dropdown',
            items: [
                {
                    displayName: 'Logout',
                    onClick: signOutUser
                }
            ],
            position: 'right',

        }
    ];
    return (
        <div>

            <TopNavigation navMenu={navMenu} />
              <Routes>
                <Route  path={'/'} element={<HomeContainer {...props}/>}/>
                <Route  path={'/room/:roomId'} element={<RoomPage {...props}/>} />
                <Route Component={()=><div>Nope 404</div>}/>
              </Routes>

            <div className={"footer"}>
                <h3>Money splicer</h3>
            </div>
        </div>
    );
}