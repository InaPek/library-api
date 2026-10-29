class User {
    constructor(id, mail) {
        this.id = id;
        this.mail = mail;
    }

    static login() {
        return { id: 1, mail: 'test@mail.ru' };
    }
}

module.exports = User;
