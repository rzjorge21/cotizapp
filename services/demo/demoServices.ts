import instance from "../../lib/axios/config";

export function RandomFact() {
    return instance.get<any>(`/fact`)
        .then( (response) => { return response })
        .catch( (error) => { return error });
}