export default async function loadJson(event: any, handleResult: any) {
    event.preventDefault();
    const fileReader = new FileReader();
    fileReader.onload = async (e: any) => {
        const text = e.target.result;
        handleResult(JSON.parse(text));
    };
    fileReader.readAsText(event.target.files[0]);
}



