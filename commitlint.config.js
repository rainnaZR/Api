module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum": [
            2,
            "always",
            ["feat", "fix", "doc", "ref", "test", "chore"]
        ],
        "body-leading-blank": [2, "always"],
        "footer-leading-blank": [2, "always"]
    }
};
