// 静态方法——策略
const strats = {}
const LIFECYCLE = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed'
]
LIFECYCLE.forEach(hook => {
    strats[hook] = function (p, c) {
        // {} {created:function(){}} => {created:[fn]}
        // {created:[fn]} {created:function(){}} => {created:[fn,fn]}
        if (c) { // 如果儿子有 父亲有 让父亲和儿子拼在一起
            if (p) {
                return p.concat(c) // 儿子有父亲没有，则将儿子包装成数组
            } else {
                return [c]
            }
        } else {
            return p // 如果儿子没有则用父亲即可
        }
    }
})
export function mergeOptions(parent, child) {
    const options = {}
    for (let key in parent) {
        mergeField(key)
    }
    for (let key in child) {
        if (!parent.hasOwnProperty(key)) {
            mergeField(key)
        }
    }
    function mergeField(key) {
        // 策略模式，减少if/else
        if (strats[key]) {
            options[key] = strats[key](parent[key], child[key])
        } else {
            options[key] = child[key] || parent[key] // 优先采用儿子，再采用父亲
        }
    }
    return options
}