export default interface UserEntity{
    userId: number | null;
    name: string | null;
    email: string | null;
    address: string | null;
    contact: string | null
    age: number | null;
    password: string | null;
    shopName: string | null;
    licenceNo: string | null;
    role: object | string | null | Array<Object>;
}