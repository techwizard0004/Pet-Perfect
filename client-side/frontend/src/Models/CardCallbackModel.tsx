export default interface CardCallbackModel{
    updateMethodName: string;
    updateCallbackMethod: () => void;

    removeMethodName: string;
    removeCallbackMethod: () => void;
}