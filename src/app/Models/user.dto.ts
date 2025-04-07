export class UserDTO {
    id: number;
    userCode: string;
    email: string;
    name: string;
    lastname: string;
    created_at: Date;

    constructor(
        id: number,
        userCode: string,
        email: string,
        name: string,
        lastname: string,
        created_at: Date
    ) {
        this.id = id
        this.userCode = userCode
        this.email = email
        this.name = name
        this.lastname = lastname
        this.created_at = created_at
    }
}