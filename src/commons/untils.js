//实例：  formateDate(new Date('12334566'),'yyyy-MM-dd hh:mm:ss');
export function formatDate(date, fmt='yyyy-MM-dd hh:mm:ss') {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }

    return fmt;
};


//
export function deepClone (source) {
    // 类型校验，如果不是引用类型 或 全等于null，直接返回
    if (source === null || typeof source !== 'object') {
        return source
    }

    let isArray = Array.isArray(source)
    let result = isArray ? [] : {}

    // 遍历属性
    if (isArray) {
        for (let i = 0, len = source.length; i < len; i++) {
            let val = source[i]
            // typeof [] === 'object', typeof {} === 'object'
            // 考虑到 typeof null === 'object' 的情况, 所以要加个判断
            if (val && typeof val === 'object') {
                result[i] = deepClone(val)
            } else {
                result[i] = val
            }
        }
        // 简写
        // result = source.map(item => {
        //     return (item && typeof item === 'object') ? deepCopy(item) : item
        // });
    } else {
        const keys = Object.keys(source)
        for (let i = 0, len = keys.length; i < len; i++) {
            let key = keys[i]
            let val = source[key]
            if (val && typeof val === 'object') {
                result[key] = deepClone(val)
            } else {
                result[key] = val
            }
        }
        // 简写
        // keys.forEach((key) => {
        //     let val = source[key];
        //     result[key] = (val && typeof val === 'object') ? deepCopy(val) : val;
        // });
    }

    return result
}