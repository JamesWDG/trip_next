import Swal from "sweetalert2";
// import "sweetalert2/src/sweetalert2.scss";

export function useToast() {
  const toast = (message, type = "success") => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: type, // 'success', 'error', 'info', etc.
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  const success = (message) => toast(message, "success");
  const error = (message) => toast(message, "error");
  const info = (message) => toast(message, "info");

  return { success, error, info };
}
