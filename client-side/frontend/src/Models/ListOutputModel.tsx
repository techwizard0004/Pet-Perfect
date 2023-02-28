export default interface ListOutputModel{
    headers: string[];
    dataList: (string | number)[][];
    redirectCallbackMethod: (id: number) => void;
}