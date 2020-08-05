declare namespace Interface {
    interface Form {
        id?: string | number;
        moduleId?: string | number;
        projectId?: string | number;
        name?: string;
        introduce?: string;
        tag?: string;
        requestUrl?: string;
        requestMethod?: string;
        requestParams?: string;
        requestResponse?: string;
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
