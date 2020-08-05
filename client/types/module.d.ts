declare namespace Module {
    interface Form {
        id?: string | number;
        name: string;
        introduce?: string;
        apiList?: Array<any>;
    }
    interface FormItemRules {
        required: boolean;
        message: string;
        trigger: string;
    }
    interface FormRules {
        [string]: FormItemRules;
    }
}
