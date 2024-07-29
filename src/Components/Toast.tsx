import { ReactElement, useEffect } from "react"
import { useSelector } from "react-redux";
import { selectToastMessage, selectToastType } from "../Store/selectors/toast_selector";
import useAppDispatch from "../Store/hooks/dispatch";
import { clearToast } from "../Store/toast_slice";

const Toast = (): ReactElement => {
    const toastMessage = useSelector(selectToastMessage);
    const toastType = useSelector(selectToastType);

    const dispatch = useAppDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(clearToast());
        }, 5000);
    }, [toastMessage]);

    if (toastMessage === "") {
        return <></>
    }
    let toastClass = "alert-primary";
    if (toastType === "error") {
        toastClass = "alert-danger";
    }
    if (toastType === "success") {
        toastClass = "alert-success";
    }

    return (
        <div className={`alert ${toastClass} fixed-bottom mx-5`}>
            <div className="d-flex">
                <div className="toast-body">
                    {toastMessage}
                </div>
                <button className="btn-close btn-close-white me-2 m-auto"
                        onClick={() => dispatch(clearToast())} 
                        aria-label="Close"></button>
            </div>
        </div>
    )
}

export default Toast;