import Swal from "sweetalert2";

export function showNotification({
  icon = "info",
  title = "",
  text = "",
  position = "center-end",
  timer = 2000,
  toast = true,
}) {
  Swal.fire({
    icon,
    title,
    text,
    position,
    timer,
    toast,
    showConfirmButton: false,
  });
}
