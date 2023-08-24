import { SubTween } from "./SubTween";
import { TweenClock } from "./TweenClock";

export default class TweenUtil {

    public static _tweenId = 1;

    public static _tweenDic = {};

    private static _tweenClock: TweenClock;

    /**
     * 启动缓动工具类 本函数负责启动缓动时间类，函数体可根据需求自定义修改
     */
    public static start() {
        let scriptScene = new Laya.Scene3D();
        Laya.stage.addChild(scriptScene);
        this._tweenClock = scriptScene.addComponent(TweenClock);
    }

    public static getTweenClock() {
        return this._tweenClock;
    }

    /**
     * to缓动 同Laya.Tween.to
     * @param target 
     * @param prop 
     * @param time 
     * @param ease 
     * @param delay 
     * @param callback 
     * @returns 
     */
    public static to(caller, target, prop, time, ease?, delay?, callback?) {
        // console.log("缓动",target);
        let subTween = new SubTween();
        subTween.target = target;
        subTween.to(prop, time, ease, delay, callback);
        if (!caller.tweenId) {
            caller.tweenId = this._tweenId++;
        }
        if (!this._tweenDic[caller.tweenId]) {
            this._tweenDic[caller.tweenId] = [];
        }

        this._tweenDic[caller.tweenId].push(subTween);
        return subTween;
    }

    /**
     * from缓动 同Laya.Tween.to
     * @param target 
     * @param prop 
     * @param time 
     * @param ease 
     * @param delay 
     * @param callback 
     * @returns 
     */
    public static from(caller, target, prop, time, ease?, delay?, callback?) {
        let subTween = new SubTween();
        subTween.target = target;
        subTween.to(prop, time, ease, delay, callback);
        if (!caller.tweenId) {
            caller.tweenId = this._tweenId++;
        }
        if (!this.caller[caller.tweenId]) {
            this.caller[caller.tweenId] = [];
        }

        this._tweenDic[caller.tweenId].push(subTween);
        return subTween;
    }

    /**
     * 清除目标缓动
     * @param tweenObj 
     */
    public static clear(tweenObj: SubTween) {
        tweenObj.clear();
    }

    /**
     * 清除目标节点所有缓动
     * @param target 
     */
    public static clearAll(caller) {
        // console.log("清除", caller)
        if (!this._tweenDic[caller.tweenId]) return;
        let len = this._tweenDic[caller.tweenId].length;
        for (let i = 0; i < len; i++) {
            (this._tweenDic[caller.tweenId][i] as SubTween).clear();
        }

        this._tweenDic[caller.tweenId] = [];
    }
}