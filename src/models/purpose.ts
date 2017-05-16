export interface PurposeTitle {
    header: string,
    payer: string,
    payers: string,
    taker: string,
    takers: string,
    took: string,
    paid: string,
    times: string
}

export enum Purpose {
    Ammount = <any>"ammount",
    Counter = <any>"counter"
}

export class PurposeInfo {

    static Title: { [id: string]: PurposeTitle; } = {
        "ammount": {
            header: "Consumo",
            payer: "Pagador",
            payers: "Pagadores",
            taker: "Consumidor",
            takers: "Consumidores",
            paid: "Pagou",
            took: "Consumiu",
            times: "unidade(s)"
        },
        "counter": {
            header: "Escolha",
            payer: "Escolhido",
            payers: "Participantes",
            taker: "Participante",
            takers: "Participantes",
            paid: "Foi escolhido",
            took: "Participou",
            times: "vez(es)"
        }
    }
}
