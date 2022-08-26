import Swal, { SweetAlertIcon } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const swal = withReactContent(Swal);

export const toastAlert = (msg: string) => {
  return swal.fire({
    icon: 'success',
    html: `<p class="toast-txt">${msg}<p>`,
    toast: true,
    position: 'top',
    timer: 1500,
    timerProgressBar: true,
    showConfirmButton: false,
    color: '#6fa96f', // fontGreen
  });
};

export const swalAlert = (msg: string, icon: SweetAlertIcon = 'error') => {
  return swal.fire({
    icon,
    text: msg,
  });
};
