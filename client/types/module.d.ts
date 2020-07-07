declare namespace Module {
    interface Form {
        id?: string | number;
        label: string;
        introduce?: string;
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
