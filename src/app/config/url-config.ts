export class UrlConfig {

    private urlEndPoint: string = 'http://localhost:8080/api/usuarios';

    urlServices(){
        return this.urlEndPoint;
    }
}