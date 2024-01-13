import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import "sweetalert2/dist/sweetalert2.all"


const MySwal = withReactContent(Swal);

const Toast = MySwal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = MySwal.stopTimer;
    toast.onmouseleave = MySwal.resumeTimer;
  }
});


const success = (msg) => Toast.fire({
  title: msg,
  icon: "success",
})

const error = (msg) => Toast.fire({
  title: msg,
  icon: "error",

})

const warning = (msg) => Toast.fire({

  title: msg,
  icon: "warning",

})


export default {
  success: success,
  error: error,
  warning: warning
}
