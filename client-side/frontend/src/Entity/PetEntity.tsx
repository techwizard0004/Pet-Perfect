export default interface PetEntity{
    id: number | null;
    petOwnerId: number | null;
    name: string | null;
    type: string | null;
    gender: string | null;
    age: number | null;
    country: string | null;
}