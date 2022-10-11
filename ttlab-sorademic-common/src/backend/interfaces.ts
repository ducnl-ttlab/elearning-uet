export interface IMongoKeywordCondition {
    $or: {
        [key: string]: {
            $regex: string;
            $options: string;
        };
    }[];
}