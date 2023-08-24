import { TweenCore } from "./TweenCore";

export class TweenClock extends Laya.Script3D {
    private _tweens:TweenCore[] = [];

    onAwake() {
        console.log("TweenClock启动")
    }

    public push(tween) {
        this._tweens.push(tween);
    }

    public sub(tween) {
        let index = this._tweens.indexOf(tween);
        index != -1 && this._tweens.splice(index, 1);
    }

    public onUpdate() {
        let time = Laya.timer.delta;
        let tween: TweenCore;
        for (let i = this._tweens.length - 1; i >= 0; i--) {
            tween = this._tweens[i];
            if (tween) {
                if (tween.getDone()) {
                    this._tweens.splice(i, 1);
                    continue;
                }
                tween.update(time);
            }
        }
    }
}