
import { store } from 'react-notifications-component';
// GREEN
export const success = (props) => {
    store.addNotification({
        // title: 'USPESNO',
        message: props,
        type: 'success',
        container: 'top-right',
        insert: 'top',
        animationIn: ["animated", "fadeInRight"],
        animationOut: ["animated", "fadeOutRight"],
        dismiss: {
            duration: 4000,
            showIcon: true
        }
    })
}
// RED
export const fail = (props) => {
    store.addNotification({
        // title: 'NEUSPESNO',
        message: props,
        type: 'danger',
        container: 'top-right',
        insert: 'top',
        animationIn: ["animated", "fadeInRight"],
        animationOut: ["animated", "fadeOutRight"],
        dismiss: {
            duration: 4000,
            showIcon: true
        }
    })
}
// RED
export const deleted = (props) => {
    store.addNotification({
        title: 'OBRISANO',
        message: props,
        type: 'danger',
        container: 'top-right',
        insert: 'top',
        animationIn: ["animated", "fadeInRight"],
        animationOut: ["animated", "fadeOutRight"],
        dismiss: {
            duration: 4000,
            showIcon: true
        }
    })
}
// YELLOW
export const warning = (props) => {
    store.addNotification({
        title: 'OBRISANO',
        message: props,
        type: 'warning',
        container: 'top-right',
        insert: 'top',
        animationIn: ["animated", "fadeInRight"],
        animationOut: ["animated", "fadeOutRight"],
        dismiss: {
            duration: 4000,
            showIcon: true
        }
    })
}
//  BLUE
export const tips = (props) => {
    store.addNotification({
        title: 'TIPS',
        message: props,
        type: 'default',
        container: 'top-right',
        insert: 'top',
        animationIn: ["animated", "fadeInRight"],
        animationOut: ["animated", "fadeOutRight"],
        dismiss: {
            duration: 4000,
            showIcon: true
        }
    })
}
// LIGHT BLUE
export const info = (props) => {
    store.addNotification({
        title: 'TIPS',
        message: props,
        type: 'info',
        container: 'top-right',
        insert: 'top',
        animationIn: ["animated", "fadeInRight"],
        animationOut: ["animated", "fadeOutRight"],
        dismiss: {
            duration: 4000,
            showIcon: true
        }
    })
}

