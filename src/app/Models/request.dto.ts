export class RequestDTO {
    id: number;
    code: string;
    created_at: Date;
    title: string;
    description: string;
    type: string;
    status: string;
    user: string

    constructor(
        id: number,
        code: string,
        created_at: Date,
        title: string,
        description: string,
        type: string,
        status: string,
        user: string
    ) {
        this.id = id
        this.code = code
        this.created_at = created_at
        this.title = title
        this.description = description
        this.type = type
        this.status = status
        this.user = user
    }
}

export const requestColumnsBBDD = [
    {
        key: 'code',
        type: 'url',
        label: 'CAI-IDI',
        label_cas: 'CAI-IDI',
    },
    {
        key: 'user',
        type: 'user',
        label: 'Usuari',
        label_cas: 'Usuario',
    },
    {
        key: 'type',
        type: 'type',
        label: 'Tipus de sol·licitud',
        label_cas: 'Tipo de solicitud',
    },
    {
        key: 'title',
        type: 'title',
        label: 'Petició',
        label_cas: 'Petición',
    },
    {
        key: 'description',
        type: 'description',
        label: 'Descripció',
        label_cas: 'Descripción',
    },
    {
        key: 'created_at',
        type: 'date',
        label: 'Data de la sol·licitud',
        label_cas: 'Fecha de la solicitud',
    },
    {
        key: 'status',
        type: 'status',
        label: 'Situació',
        label_cas: 'Situación',
    }
]