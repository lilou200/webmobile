import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';

const {confirm, error} = Modal;

export const showErrorModal = ({message}) => {
    error({
        title: 'Erreur',
        icon: <ExclamationCircleFilled style={{color: '#D72828'}} />,
        content: message ?? 'Erreur technique. Veuillez réessayer plus tard',
        });
}


export const showConfirmationModal = (title, message) => {
   confirm({
    title,
    content: message,
    icon: <ExclamationCircleFilled />
   })
}
