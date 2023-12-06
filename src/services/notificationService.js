import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.all';


const MySwal = withReactContent(Swal);


const success = (msg) => MySwal.fire({
  title: msg,
  position: "center",
  icon: "sucess",
})


export default {
  success: success
}
