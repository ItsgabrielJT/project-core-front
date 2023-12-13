import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.all';


const MySwal = withReactContent(Swal);


const success = (msg) => MySwal.fire({
  text: msg,
  position: "center",
  icon: "success",
  background: "#FFFDFA",
  showConfirmButton: true
})

const error = (msg) => MySwal.fire({
  text: msg,
  position: "center",
  icon: "error",
  timer: 3000,
  background: "#FFFDFA",
  showConfirmButton: false
})

const warning = (msg) => MySwal.fire({
  text: msg,
  position: "center",
  icon: "warning",
  timer: 2500,
  background: "#FFFDFA",
  showConfirmButton: false
})


export default {
  success: success,
  error: error,
  warning: warning
}
