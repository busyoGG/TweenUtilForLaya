import { TweenCore } from "./TweenCore";

export class SubTween {
    /** 目标节点 */
    public target;
    /** 缓动列表索引 */
    private _listIndex = 0;
    /** 缓动列表 */
    private _tweenList;
    /** 是否正在缓动 */
    private _tweening = false;
    /** 缓动对象 */
    private _tweenObj: TweenCore;
    /** 缓动索引 */
    private _tweenIndex = 0;
    /** 是否循环 */
    private _loop = false;
    /** 缓动循环次数限制列表 */
    private _limit:number[] = [];

    /**
     * 缓动 从现在属性到目标属性
     * @param prop 
     * @param time 
     * @param ease 
     * @param delay 
     * @param callback 
     * @returns 
     */
    public to(prop, time, ease?, delay?, callback?) {
        if (!this._tweenList) {
            this._tweenList = [];
        }
        if (!this._tweenList[this._listIndex]) {
            this._tweenList[this._listIndex] = [];
        }
        this._tweenList[this._listIndex].push({
            prop: prop,
            time: time,
            ease: ease,
            delay: delay,
            callback: callback,
            type: 0
        });
        this.startTween();
        return this;
    }

    /**
     * 缓动 从目标属性到现在属性
     * @param prop 
     * @param time 
     * @param ease 
     * @param delay 
     * @param callback 
     * @returns 
     */
    public from(prop, time, ease?, delay?, callback?) {
        if (!this._tweenList) {
            this._tweenList = [];
        }
        if (!this._tweenList[this._listIndex]) {
            this._tweenList[this._listIndex] = [];
        }
        this._tweenList[this._listIndex].push({
            prop: prop,
            time: time,
            ease: ease,
            delay: delay,
            callback: callback,
            type: 1
        });
        this.startTween();
        return this;
    }

    /**
     * 循环前面所有的动作
     * @param 循环次数 不填或者0为无限循环 只有在非无限循环的情况下可以执行本次loop后面的缓动
     */
    public loop(limit = 0) {
        this._loop = true;
        this._limit[this._listIndex] = limit - 1;
        this._listIndex++;
        return this;
    }

    /**
     * 清除缓动
     */
    public clear() {
        if (this._tweenObj) {
            this._tweenObj.clear();
        }
        this._tweenList = null;
        return this;
    }

    /**
     * 开始缓动
     */
    private startTween() {
        if (!this._tweening) {
            this._tweening = true;
            this.doTween();
        }
    }

    /**
     * 执行缓动
     */
    private doTween() {
        let self = this;
        if (!this._tweenList) return;
        let param = this._tweenList[0][this._tweenIndex++];
        if (param) {
            if (param.type == 0) {
                this._tweenObj = new TweenCore();
                this._tweenObj.to(this.target, param.prop, param.time, param.ease, () => {
                    param.callback && param.callback();
                    self.doTween();
                }, param.delay);
            } else {
                this._tweenObj = new TweenCore();
                this._tweenObj.from(this.target, param.prop, param.time, param.ease, () => {
                    param.callback && param.callback();
                    self.doTween();
                }, param.delay);
            }
        } else {
            if (this._loop) {
                this._tweenIndex = 0;
                if (this._limit[0] == -1) {
                    this.doTween();
                } else {
                    if (this._limit[0] > 0) {
                        this._limit[0]--;
                    } else {
                        this._tweenList.shift();
                        this._limit.shift();
                        this._listIndex--;
                        if (this._tweenList.length == 0) {
                            this._tweenList = null;
                        }
                    }
                    this.doTween();
                }
            } else {
                this._tweenList = null;
                this._limit = [];
            }
        }
    }
}