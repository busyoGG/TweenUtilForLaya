import TweenUtil from "./TweenUtil";

export class TweenCore {
    private _target;
    private _prop;
    private _duration;
    private _ease;
    private _complete;
    private _delay;
    private _direction;
    private _isDone;
    private _time = 0;
    private _def = {};
    private _isDelay = false;

    public to(target: any, props: any, duration: number, ease?: Function | null, complete?, delay?: number) {
        this._target = target;
        this._prop = props;
        this._duration = duration;
        this._ease = ease || Laya.Ease.linearInOut;
        this._complete = complete;
        this._delay = delay ? delay : 0;
        this._delay && (this._isDelay = true);
        this._direction = 1;
        this._isDone = false;
        for (let key in this._prop) {
            this._def[key] = this._target[key];
        }
        TweenUtil.getTweenClock().push(this);
        return this;
    }

    public from(target: any, props: any, duration: number, ease?: Function | null, complete?, delay?: number) {
        this._target = target;
        this._prop = props;
        this._duration = duration;
        this._ease = ease || Laya.Ease.linearInOut;
        this._complete = complete;
        this._delay = delay ? delay : 0;
        this._delay && (this._isDelay = true);
        this._direction = 1;
        this._isDone = false;
        for (let key in this._prop) {
            this._def[key] = this._target[key];
        }
        TweenUtil.getTweenClock().push(this);
        return this;
    }

    public update(dt) {
        if (this._target && !this._isDone) {
            //计算进度
            this._time += dt;
            if (this._isDelay) {
                if (this._time >= this._delay) {
                    this._isDelay = false;
                    this._time = 0;
                }
            } else {
                if (this._time > this._duration) {
                    this._time = this._duration;
                    this._isDone = true;
                }
                //更新
                let ease = this._ease(this._time, 0, 1, this._duration);
                for (let key in this._prop) {
                    if (key == "update") {
                        this._prop[key]();
                    } else {
                        this._target[key] = this._def[key] + (this._prop[key] - this._def[key]) * ease * this._direction;
                    }
                }
                //结束回调
                if (this._isDone) {
                    this.clear();
                    this._complete && this._complete();
                    this._complete = null;
                }
            }
        }
    }

    public clear() {
        TweenUtil.getTweenClock().sub(this);
        this._target = null;
        this._prop = null;
        this._duration = null;
        this._ease = null;
        this._delay = null;
        this._direction = null;
        this._isDone = null;
        this._time = 0;
        this._def = {};
        this._isDelay = false;
    }

    public getDone() {
        return this._isDone;
    }
}