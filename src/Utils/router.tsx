import { createBrowserRouter } from "react-router-dom";
import Layout from "../Pages/Layout";
import Start from "../Pages/Start";
import About from "../Pages/About";
import AllUsers from "../Pages/AllUsers";
import UserProfile from "../Pages/UserProfile";
import AllCompanies from "../Pages/AllCompanies";
import CompanyProfile from "../Pages/CompanyProfile";
import UserAuthorization from "../Pages/UserAuthorization";
import UserRegistration from "../Pages/UserRegistration";
import UserInvites from "../Components/User/UserInvites";



const USER_LIST_PATH = "/users/";
const USER_PROFILE_PATH = "/users/:userId";
const USER_PROFILE_EDIT_PATH = "/users/:userId/edit";
const USER_PROFILE_EDIT_PASSWORD_PATH = "/users/:userId/edit/password";

export const getUserListPath = () => USER_LIST_PATH;
export const getUserProfilePath = (userId: string) => USER_PROFILE_PATH.replace(":userId", userId);
export const getUserProfileEditPath = (userId: string) => USER_PROFILE_EDIT_PATH.replace(":userId", userId);
export const getUserProfileEditPasswordPath = (userId: string) => USER_PROFILE_EDIT_PASSWORD_PATH.replace(":userId", userId);


const COMPANY_LIST_PATH = "/companies";
const MY_COMPANY_LIST_PATH = "/companies/my";
const COMPANY_PROFILE_PATH = "/companies/:companyId";
const COMPANY_PROFILE_EDIT_PATH = "/companies/:companyId/edit";
const COMPANY_PROFILE_MEMBERS_PATH = "/companies/:companyId/members";
const COMPANY_PROFILE_INVITES_PATH = "/companies/:companyId/invites";
const COMPANY_PROFILE_REQUESTS_PATH = "/companies/:companyId/requests";

export const getCompanyListPath = () => COMPANY_LIST_PATH;
export const getMyCompanyListPath = () => MY_COMPANY_LIST_PATH;
export const getCompanyPath = (companyId: string) => COMPANY_PROFILE_PATH.replace(":companyId", companyId);
export const getCompanyEditPath = (companyId: string) => COMPANY_PROFILE_EDIT_PATH.replace(":companyId", companyId);
export const getCompanyMembersPath = (companyId: string) => COMPANY_PROFILE_MEMBERS_PATH.replace(":companyId", companyId);
export const getCompanyInvitesPath = (companyId: string) => COMPANY_PROFILE_INVITES_PATH.replace(":companyId", companyId);
export const getCompanyRequestsPath = (companyId: string) => COMPANY_PROFILE_REQUESTS_PATH.replace(":companyId", companyId);


const LOGIN_PATH = "/login";
const REGISTER_PATH = "/register";
const ABOUT_PATH = "/about";

export const getLoginPath = () => LOGIN_PATH;
export const getRegisterPath = () => REGISTER_PATH;
export const getAboutPath = () => ABOUT_PATH;

const MY_REQUESTS_PATH = "/requests";
const MY_INVITES_PATH = "/invites";

export const getMyRequestsPath = () => MY_REQUESTS_PATH;
export const getMyInvitesPath = () => MY_INVITES_PATH;

const router = createBrowserRouter([
    {
        path: "",
        element: <Layout/>,
        // errorElement: <PageNotFound/>,
        children: [
            {
                path: "/",
                element: <Start/>
            },
            {
                path: ABOUT_PATH,
                element: <About/>
            },
            {
                path: USER_LIST_PATH,
                element: <AllUsers/>,
            },
            {
                path: USER_PROFILE_PATH,
                element: <UserProfile editing={false}/>,
            },
            {
                path: USER_PROFILE_EDIT_PATH,
                element: <UserProfile editing={true}/>,
            },
            {
                path: USER_PROFILE_EDIT_PASSWORD_PATH,
                element: <UserProfile editing={true} changePassword={true}/>,
            },
            {
                path: COMPANY_LIST_PATH, 
                element: <AllCompanies showingAllCompanies={true}/>
            },
            {
                path: MY_COMPANY_LIST_PATH,
                element: <AllCompanies showingAllCompanies={false}/>
            },
            {
                path: COMPANY_PROFILE_PATH,
                element: <CompanyProfile openedTab="info"/>
            },
            {
                path: COMPANY_PROFILE_MEMBERS_PATH,
                element: <CompanyProfile openedTab="members"/>
            }, 
            {
                path: COMPANY_PROFILE_EDIT_PATH,
                element: <CompanyProfile openedTab="edit"/>
            },
            {
                path: COMPANY_PROFILE_INVITES_PATH,
                element: <CompanyProfile openedTab="invites"/>
            },
            {
                path: COMPANY_PROFILE_REQUESTS_PATH,
                element: <CompanyProfile openedTab="requests"/>
            },
            {
                path: LOGIN_PATH,
                element: <UserAuthorization/>
            },
            {
                path: REGISTER_PATH,
                element: <UserRegistration/>
            },
            {
                path: MY_REQUESTS_PATH,
                element: <UserAuthorization/>
            },
            {
                path: MY_INVITES_PATH,
                element: <UserInvites/>
            }
        ]
    },
]);


export default router;