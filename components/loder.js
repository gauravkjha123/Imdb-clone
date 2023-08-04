/**
 *
 * @param {String} target  target element
 * @param {Boolean} isLoading Status if is loading or completed
 */
export default function creatLoader(target, isLoading) {
  if (!target) {
    return;
  }
  let loader = document.getElementById("loader");
  if (loader) {
    if (isLoading) {
      loader.style.display = "block";
    } else {
      loader.style.display = "none";
      target.removeChild(loader);
    }
  } else {
    loader = document.createElement("div");
    loader.className = "loader-container";
    loader.id = "loader";
  }
  target.append(loader);
}
