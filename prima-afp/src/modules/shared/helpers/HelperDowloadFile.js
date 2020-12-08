export const downloadFile = (blob,documentName) => {
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", documentName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
}