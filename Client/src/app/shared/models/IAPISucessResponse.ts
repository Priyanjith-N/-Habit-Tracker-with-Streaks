export interface IAuthAPISucessfullResponse {
    message: string;
}

export interface IHabitAPISucessfullResponseWithData<T> {
    message: string;
    data: T;
}