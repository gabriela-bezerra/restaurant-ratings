import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = ({ message, type }) => {
    return (
        <div>
            <ToastContainer
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {type === 'success' &&
                toast.success(message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            {type === 'error' &&
                toast.error(message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            {type === 'warning' &&
                toast.warning(message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
        </div>
    );
};

export default Toast;
