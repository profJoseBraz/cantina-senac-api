class Category{
    private id : number;
    private nome : string;

    constructor(id: number, nome: string) {
      this.id = id
      this.nome = nome
    }

    public getId(): number {
      return this.id;
    }

    public setId(value: number) {
      this.id = value;
    }

    public getNome(): string {
      return this.nome;
    }
    
    public setNome(value: string) {
      this.nome = value;
    }
}