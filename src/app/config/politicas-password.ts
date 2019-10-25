
export interface PoliticasPasswordAtributos {
    validacion: any;
    mensaje: string;
}

export class PoliticasPassword {

    minCaracteres:number = 7;
    maxCaracteres:number = 50;
    minNumeros:number = 1;
    minCaracteresEspeciales:number = 1;
    minMayuscula:number = 1;
    validarPasswordBand:boolean = true;

    private arregloPoliticas:PoliticasPasswordAtributos[] =
    [   
        {
            validacion: 1,
            mensaje: "No se permite que el password contenga espacios"
        },{
            validacion: 2,
            mensaje: "El password debe ser mínimo de "+this.minCaracteres+" caracteres"
        },{
            validacion: 3,
            mensaje: "El password debe contener mínimo "+this.minNumeros+" número"
        },{
            validacion: 4,
            mensaje: "El password debe contener minimo "+this.minCaracteresEspeciales+" caracter especial"
        },{
            validacion: 5,
            mensaje: "El password debe contener mínimo "+this.minMayuscula+" mayuscula"
        }
    ];

    politicasPassword():PoliticasPasswordAtributos[]{
        return this.arregloPoliticas;
    }

    validarPassword(password:string, validacion:number):any{

        switch (validacion) {
            case 1:
                for(let i=0;i<password.length;i++){
                    if(password.charAt(i) == " "){
                        this.validarPasswordBand = false;
                    }
                }
                break;
            case 2:
                if(password.length < this.minCaracteres){
                    this.validarPasswordBand = false;
                }
                break;
            case 3:
            
                break;
            case 4:
        
                break;
            case 5:
        
                break;
        
            default:
                break;
        }
        
    }
}