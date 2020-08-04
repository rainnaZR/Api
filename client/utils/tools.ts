import JSON5 from "json5";

const formatJson = (value: any, indentSize?: number) => {
    if (!value) return;
    value = JSON5.parse(value);
    return JSON.stringify(value, null, indentSize || 2);
};

export { formatJson };
