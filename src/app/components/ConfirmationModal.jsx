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
    cancelButtonBorderRadius: "8px",
    cancelButtonFontWeight: "500",
    cancelButtonFontSize: "14px",
    cancelButtonPadding: "12px 28px"
  });

  // if (result.isConfirmed) {
  //   if (onConfirm) {
  //     await onConfirm();
  //   }
  //   return true;
  // }

  // return false;
};

// export function showDeleteConfirmation(itemName, onConfirm) {
//   return ConfirmationModal({ itemName, onConfirm });
// }

/**
 * Success toast after deletion
 */
// export function showDeleteSuccess(itemName = "Item") {
//   Swal.fire({
//     title: "Deleted!",
//     text: `${itemName} has been deleted successfully.`,
//     icon: "success",
//     timer: 2000,
//     showConfirmButton: false,
//     customClass: {
//       popup: "swal-popup",
//       title: "swal-title",
//     },
//     buttonsStyling: false,
//     background: "#ffffff",
//     padding: "20px",
//     width: "350px",
//     confirmButtonColor: "#ee4026",
//     confirmButtonBorderRadius: "8px",
//     confirmButtonPadding: "10px 24px",
//     confirmButtonFontSize: "14px",
//   });
// }

/**
 * Error toast if deletion fails
 */
// export function showDeleteError(message = "Failed to delete item") {
//   Swal.fire({
//     title: "Error!",
//     text: message,
//     icon: "error",
//     timer: 3000,
//     showConfirmButton: true,
//     customClass: {
//       popup: "swal-popup",
//       title: "swal-title",
//     },
//     buttonsStyling: false,
//     background: "#ffffff",
//     padding: "20px",
//     width: "350px",
//     confirmButtonColor: "#ee4026",
//     confirmButtonBorderRadius: "8px",
//     confirmButtonPadding: "10px 24px",
//     confirmButtonFontSize: "14px",
//   });
// }
