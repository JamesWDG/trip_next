import { useCallback } from "react";
import Swal from "sweetalert2";
// import "sweetalert2/src/sweetalert2.scss";

export function useToast() {
  const toast = useCallback((message, type = "success") => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: type, // 'success', 'error', 'info', etc.
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }, []);

  const success = useCallback(
    (message) => toast(message, "success"),
    [toast],
  );
  const error = useCallback((message) => toast(message, "error"), [toast]);
  const info = useCallback((message) => toast(message, "info"), [toast]);

  return { success, error, info };
}
