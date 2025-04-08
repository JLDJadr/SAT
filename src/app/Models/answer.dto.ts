export class AnswerDTO {
    id: number;
    requestId: number;
    created_at: Date;
    answer: string;
    status: string;
    user?: string

    constructor(
        id: number,
        requestId: number,
        created_at: Date,
        answer: string,
        status: string,
        user?: string
    ) {
        this.id = id
        this.requestId = requestId
        this.created_at = created_at
        this.answer = answer
        this.status = status
        this.user = user
    }
}

export const answerColumnsBBDD = [
    {
        key: 'created_at',
        type: 'date',
        label: 'Data',
        label_cas: 'Fecha',
    },
    {
        key: 'answer',
        type: 'answer',
        label: 'Resposta',
        label_cas: 'Respuesta',
    },
    {
        key: 'status',
        type: 'status',
        label: 'Situació',
        label_cas: 'Situación',
    },
    {
        key: 'user',
        type: 'user',
        label: 'Usuari',
        label_cas: 'Usuario',
    }
]