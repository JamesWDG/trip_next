// "use client";

import Swal from "sweetalert2";

export default async function ConfirmationModal({ 
    itemName = "this item",
    onConfirm
}) {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: `Are you sure you want to delete ${itemName}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    reverseButtons: true,
    customClass: {
      confirmButton: "swal-confirm-btn",
      cancelButton: "swal-cancel-btn",
      popup: "swal-popup",
      title: "swal-title",
      content: "swal-content",
    },
    background: "#ffffff",
    padding: "30px 30px 50px 30px",
    width: "470px",
    cancelButtonColor: "#a3a3a3",
  });

  if (result.isConfirmed) {
    if (onConfirm) {
      await onConfirm();
    }
    return true;
  }

  return false;
};
