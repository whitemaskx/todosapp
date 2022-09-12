export default class navbar {
constructor() {
    this.homeBtn = document.getElementById("homelink");
}

onClick(callback) {
    this.homeBtn.onclick = () => {
        callback();
    };
}
}
