import { Link } from "react-router-dom";
import { CompanyDetail } from "../../Types/CompanyType";
import { getUserProfilePath } from "../../Utils/router";
import useAppDispatch from "../../Store/hooks/dispatch";
import { fetchAcceptInvite, fetchCancelRequest, fetchDeclineInvite, fetchRequestToJoinCompany } from "../../Store/companyActionUserSlice";
import { useState } from "react";
import ModalWindow from "../ModalWindow";

const ComapnyProfileInfo = ({company}: {company: CompanyDetail}) => {
    const dispatch = useAppDispatch();
    const [confirmModalShown, setConfirmModalShown] = useState(false);
    const [actionFunction, setActionFunction] = useState<(() => void) | null>(null);
    return (
        <>
            <h1>{company.name}</h1>
            <p>{company.description}</p>

            <h4>Owner</h4>
            <p className="text-muted"><Link className="text-muted" to={getUserProfilePath(company.owner.id)}>{company.owner.username}</Link> | {company.owner.email}</p>
            {company.is_member == 'no' && <button className="btn btn-primary" onClick={() => {
                dispatch(fetchRequestToJoinCompany(company));
            }}>Request to Join</button>}
            {company.is_member == 'pending_request' && (
                <div>
                    <p className="text-muted">Your request is pending</p>
                    <button className="btn btn-danger" onClick={() => {
                        setConfirmModalShown(true);
                        setActionFunction(() => () =>{
                            dispatch(fetchCancelRequest(company.id));
                        });
                    }}>Cancel Request</button>
                </div>
            )}

            {company.is_member == 'pending_invite' && (
                <div>
                    <p><b>You have been invited to this company</b></p>
                    <button className="btn btn-primary" onClick={() => {
                        setConfirmModalShown(true);
                        setActionFunction(() => () => {
                            dispatch(fetchAcceptInvite(company.id));
                        });
                    }}>Accept Invite</button>
                    <button className="btn btn-danger ms-1" onClick={() => {
                        setConfirmModalShown(true);
                        setActionFunction(() => () => {
                            dispatch(fetchDeclineInvite(company.id));
                        });
                    }}>Decline</button>
                </div>
            )}

            <ModalWindow isOpen={confirmModalShown} onClose={function (): void {
                setConfirmModalShown(false);
                setActionFunction(null);
            } } title="Are you sure?"> 
                <button className="btn btn-lg btn-primary" onClick={() => {
                    if (actionFunction) {
                        actionFunction();
                    }
                    setConfirmModalShown(false);
                    setActionFunction(null);
                }}>Yes</button>
                <button className="btn btn-lg btn-secondary" onClick={() => {
                    setConfirmModalShown(false);
                    setActionFunction(null);
                }}>No</button>
            </ModalWindow>
        </>
    );
}

export default ComapnyProfileInfo;