export function downloadBlob(blob: Blob, url: string) {
  const name = url.replace(/^.*[\\\/]/, '');
  if (window.navigator && window.navigator.msSaveOrOpenBlob)
    return window.navigator.msSaveOrOpenBlob(blob);
  const data = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = data;
  link.download = name;
  link.click();
  setTimeout(() => {
    window.URL.revokeObjectURL(data);
    link.remove();
  }, 100);
}
