export default interface Repository {
    findOneBy(params: any): Promise<any>;
    findBy(params: any): Promise<any>;


}