/* 配置链接参考：
https://help.aliyun.com/document_detail/32069.html#h2-url-2
https://help.aliyun.com/document_detail/64041.html
*/
const imgUtils = {
    SIZE_UNITS: {
        KB: 1024,
        MB: 1024 * 1024,
        GB: 1024 * 1024 * 1024
    },

    // 图片cdn域名
    IMAGE_DOMAIN: {
        "image-xxx": "https://image.xxx.com",
        "xxx-online": "https://img1.xxx.com"
    },

    // oss配置
    OSS_CONFIG: {
        region: "oss-cn-hangzhou",
        accessKeyId: "xxx",
        accessKeySecret: "xxx",
        stsToken: ""
    },

    // 检查文件后缀名
    checkExtensions(file, extensions) {
        if (!extensions) return true;
        extensions = extensions[0];
        if (!extensions) return true;

        let fileName = file.originalFilename;
        let ext = fileName
            .substring(fileName.lastIndexOf(".") + 1, fileName.length)
            .toLowerCase();
        if (typeof extensions === "string") {
            extensions = extensions.split(",");
        }
        if (extensions.indexOf(ext) >= 0) {
            return true;
        }
    },

    // 检查文件大小
    checkSize(file, maxSize) {
        if (!maxSize) return true;
        maxSize = maxSize[0];
        if (!maxSize) return true;

        if (!isNaN(maxSize)) {
            maxSize = +maxSize;
        } else {
            // 按照单位换算
            let unit = maxSize.slice(-2).toUpperCase();
            if (!this.SIZE_UNITS[unit]) {
                return false;
            }
            maxSize = maxSize.slice(0, -2) * this.SIZE_UNITS[unit];
        }
        if (file.size <= maxSize) {
            return true;
        }
    },

    // 检查文件的无效尺寸
    checkDimension(width, height, limitWidth, limitHeight) {
        limitWidth && (limitWidth = Number(limitWidth));
        limitHeight && (limitHeight = Number(limitHeight));

        const options = {
            width,
            height,
            limitWidth,
            limitHeight
        };
        // 没有限制图片宽高时
        if (!limitWidth && !limitHeight) {
            return {
                success: true,
                ...options
            };
        }
        // 如果设置宽高
        if (limitWidth && limitHeight) {
            if (
                limitWidth &&
                width == limitWidth &&
                limitHeight &&
                height == limitHeight
            ) {
                return {
                    success: true,
                    ...options
                };
            }
            return {
                name: "DimensionError",
                message: "图片没有按照指定宽度和高度上传！",
                data: {
                    ...options
                }
            };
        }
        // 如果仅设置了宽度
        if (limitWidth) {
            // 如果设置了图片宽度，且上传图片的宽度等于设置宽度时
            if (limitWidth && width == limitWidth) {
                return {
                    success: true,
                    ...options
                };
            }

            return {
                name: "DimensionWidthError",
                message: "图片没有按照指定宽度上传！",
                data: {
                    ...options
                }
            };
        }
        // 如果仅设置了高度
        if (limitHeight) {
            // 如果设置了图片高度，且上传图片的高度等于设置高度时
            if (limitHeight && height == limitHeight) {
                return {
                    success: true,
                    ...options
                };
            }

            return {
                name: "DimensionHeightError",
                message: "图片没有按照指定高度上传！",
                data: {
                    ...options
                }
            };
        }
    },

    // 生成带hash码的文件名，避免重名文件
    hashFileName(name) {
        let res = name.match(/(\w*)(\.\w+)/);
        let hash = Math.random()
            .toString(16)
            .substring(2);

        return `${res[1]}${hash}${res[2]}`;
    },

    // 对缺少/的路径名进行处理
    formatDirectory(name) {
        if (!name) {
            return "";
        }
        name = name[0];
        if (name.indexOf("/") == -1) {
            return `${name}/`;
        }
        return name.replace(/^\//, "");
    },

    getDirectory(rootDirectory, fileDirectory) {
        return `${this.formatDirectory(rootDirectory)}${this.formatDirectory(
            fileDirectory
        )}`;
    }
};

module.exports = imgUtils;
