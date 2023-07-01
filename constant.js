export default{
    apiURL: "http://localhost:8080/api/",
    URL:"http://localhost:8081/",
    secretKey : "HttpKissiCongo2024@@",
    // Récuprération de la date courante
    getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        this.currentDate = `${year}-${month}-${day}`; //2023-06-4
        return this.currentDate;
    },
    // Récupération de l'heure courante
    getCurrentTime() {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const currentTime = `${hours}:${minutes}`; // 11:00
        return currentTime;
    }
}