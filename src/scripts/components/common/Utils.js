class Utils {

    static randomRgbColor() {
        return 'rgb(' + this.randomInt(255) + ',' + this.randomInt(255) + ',' + this.randomInt(255) + ')';
    }

    static randomColor() {
        return ((this.randomInt(255) & 0xFF) << 16) | ((this.randomInt(255) & 0xFF) << 8) | ((this.randomInt(255) & 0xFF) << 0);
    }

    static randomInt(_limit) {
        return Math.round(Math.random() * _limit);
    }

    static randomFloat(_limit) {
        return Math.round(Math.random() * _limit) + Math.random();
    }

    static randomFloatRange(_limit1, _limit2) {
        return _limit1 + this.randomFloat(_limit2 - _limit1);
    }
}

module.exports = Utils;