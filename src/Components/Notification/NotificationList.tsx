import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectNotificationPanelOpened, selectNotifications } from "../../Store/selectors/notification_selector";
import useAppDispatch from "../../Store/hooks/dispatch";
import { closeNotificationPanel, fetchNotifications, fetchReadNotification } from "../../Store/notificationSlice";
import { Notification } from "../../Types/Notification";
import styled from "styled-components";
import ModalWindow from "../ModalWindow";

const FixedDiv = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    width: 300px;
    height: 100%;
    background-color: white;
    border-left: 1px solid black;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
    z-index: 10;
    overflow-y: auto;
    transition: 0.5s;
`;


const NotificationList = (): ReactElement => {
    const notificationPanelOpened = useSelector(selectNotificationPanelOpened);
    const notifications = useSelector(selectNotifications);
    const dispatch = useAppDispatch();
    const [openedNotification, setOpenedNotification] = useState<Notification | null>(null);
    const [showOnlyUnread, setShowOnlyUnread] = useState(false);

    useEffect(() => {
        dispatch(fetchNotifications());
        const interval = setInterval(() => {
            dispatch(fetchNotifications());
        }, 30000);
        return () => clearInterval(interval);
    }, [])

    return (
        <>
            <FixedDiv style={{right: notificationPanelOpened ? 0 : -300}}>

                <div className="p-2">
                    <button className="btn btn-sm btn-outline-primary me-1" onClick={() => dispatch(fetchNotifications())}>Refresh</button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => dispatch(closeNotificationPanel())}>Close</button>

                    <div className="form-check form-switch">
                        <input checked={showOnlyUnread} onChange={(e) => setShowOnlyUnread(e.target.checked)} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Show only Unread</label>
                    </div>
                </div>
                <ul className="list-group z-index-1">
                    {notifications.map((notification) => {
                        if (showOnlyUnread && notification.is_read) {
                            return <></>;
                        }
                        return <li className="list-group-item" key={notification.id}>
                            <p>
                                {notification.is_read ? notification.title : <b>{notification.title}</b>}
                            </p>
                            <a className="me-2" href="#" onClick={() => setOpenedNotification(notification)}>Open</a>
                            {!notification.is_read
                            &&
                            <a href="#" onClick={(() => dispatch(fetchReadNotification({notificationId: notification.id})))}>Mark as Read</a>
                        }   
                        </li>
                })}
                </ul>
            </FixedDiv>
            <ModalWindow isOpen={openedNotification !== null} onClose={() => setOpenedNotification(null)} title="Notification">
                <h4>{openedNotification?.title}</h4>
                <p>{openedNotification?.body}</p>
                {
                    openedNotification?.is_read
                    ? <b>Read</b>
                    : <button className="btn btn-primary" onClick={() => {
                        dispatch(fetchReadNotification({notificationId: openedNotification!.id}))
                        setOpenedNotification({...openedNotification!, is_read: true});
                    }}>Mark as Read</button>
                }
            </ModalWindow>
        </>
    )
}

export default NotificationList;