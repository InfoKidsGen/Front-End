import { Postagem } from "./Postagem"

export class Tema{
    
    public id: number
    public assunto: string
    public publicoAlvo: string
    public idioma: string
    public postagem: Postagem []
    
}