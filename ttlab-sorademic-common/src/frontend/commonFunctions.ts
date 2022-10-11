import axios from 'axios';
export const downloadFile = async (
    fileName: string,
    url: string,
): Promise<void> => {
    const res = await axios.get(url, {
        responseType: 'arraybuffer',
    });
    const blob = new Blob([res.data], { type: 'text' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
};
