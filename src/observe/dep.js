let id = 0
class Dep {
    constructor() {
        this.id = id++
        // 属性的dep要收集watcher，这里存放着当前属性对应的watcher有哪些
        this.subs = []
    }
    depend() {
        // this.subs.push(Dep.target)
        Dep.target.addDep(this) // 让watcher记住dep
    }
    addSub(watcher) {
        this.subs.push(watcher)
    }
    notify() {
        this.subs.forEach(watcher => watcher.update())
    }
}
Dep.target = null
export default Dep;