import { ReactElement, useEffect, useState } from "react"
import { CompanyDetail } from "../../Types/CompanyType"
import { useSelector } from "react-redux"
import { selectCompanyRequests } from "../../Store/selectors/company_selector"
import useAppDispatch from "../../Store/hooks/dispatch"
import { fetchAcceptUserRequest, fetchCompanyRequests, fetchRejectUserRequest } from "../../Store/companyProfileSlice"
import UserListWithActionButton from "../User/UserListWIthActionButton"
import ModalWindow from "../ModalWindow"
import { usernameEmailDataGetters } from "../../Utils/userList"

const CompanyMembers = ({company}: {company: CompanyDetail}): ReactElement => {
    
    const dispatch = useAppDispatch();
    const requests = useSelector(selectCompanyRequests);

    const [confirmModalShown, setConfirmModalShown] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [mode, setMode] = useState<"accept" | "reject" | null>(null);


    useEffect(() => {
        dispatch(fetchCompanyRequests(company.id));
    }, [company.id]);

    const actions = [
        {
            func: (userId: string) => {
                setMode("accept");
                setSelectedUserId(userId);
                setConfirmModalShown(true);
            },
            text: "Accept",
            customClass: "btn-primary"
        },
        {
            func: (userId: string) => {
                setMode("reject");
                setSelectedUserId(userId);
                setConfirmModalShown(true);
            },
            text: "Reject",
            customClass: "btn-danger ms-1"
        }
    ]

    return (
        <>
            <UserListWithActionButton users={requests} actions={actions} dataGetters={usernameEmailDataGetters}/>

            <ModalWindow isOpen={confirmModalShown} onClose={() => {
                setConfirmModalShown(false);
                setSelectedUserId(null);
            }} title={mode === 'accept' ? 'Confirm accepting user' : 'Confirm rejecting user'}>
                <button className={"btn btn-lg " + (mode === 'accept' ? 'btn-success' : 'btn-danger')} onClick={() => {
                    if (!selectedUserId || !mode) return;
                    if (mode === "accept") {
                        dispatch(fetchAcceptUserRequest({companyId: company.id, userId: selectedUserId}));
                    } else if (mode === "reject") {
                        dispatch(fetchRejectUserRequest({companyId: company.id, userId: selectedUserId}));
                    }
                    setConfirmModalShown(false);
                    setSelectedUserId(null);
                }}>Yes</button>
                <button className="btn btn-lg btn-secondary" onClick={() => {
                    setConfirmModalShown(false);
                    setSelectedUserId(null);
                }}>No</button>
            </ModalWindow>
        </>
    )
}


export default CompanyMembers;