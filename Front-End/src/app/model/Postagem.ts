import { Tema } from "./Tema"
import { Usuario} from "./Usuario"

export class Postagem{
    
    public id: number
    public texto: string
    public data: Date
    public midia: string
    public titulo: string
    public usuario: Usuario
    public tema: Tema

}